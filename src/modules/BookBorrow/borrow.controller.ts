import { Request, Response } from "express";

import BookBorrowModel from "./bookBorrow.model";

const borrowCreate = async (req: Request, res: Response) => {
   try {
      // const data = await BookBorrowModel.create(req.body);
      const data = new BookBorrowModel(req.body, { new: true, runValidators: true });

      // const deductCopies = await data.deductCopies(req.body.quantity);
      const deductCopies = await BookBorrowModel.deductCopies(req.body.book, req.body.quantity);
      await data.save();
      if (!deductCopies) {
         res.status(400).json({
            success: false,
            message: "Failed to deduct copies",
         });
      }

      if (!data) {
         res.status(400).json({
            success: false,
            message: "Failed to borrow book",
         });
      }
      res.status(200).send({
         success: true,
         message: "Book borrowed successfully",
         data,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "book borrow failed",
         error,
      });
   }
};

const bookborrowGet = async (req: Request, res: Response) => {
   try {
      const data = await BookBorrowModel.aggregate(
         [
            {
               $facet: {
                  book: [
                     {
                        $lookup: {
                           from: "books",
                           localField: "book",
                           foreignField: "_id",
                           as: "bookDetails",
                        },
                     },
                     {
                        $unwind: "$bookDetails",
                     },
                     {
                        $project: {
                           title: "$bookDetails.title",
                           isbn: "$bookDetails.isbn",
                        },
                     },
                  ],
                  totalQuantity: [
                     {
                        $group: {
                           _id: "bookDetails._id",
                           totalQuantity: { $sum: "$quantity" },
                        },
                     },
                  ],
               },
            },
         ],
         { new: true, runValidators: true }
      );

      if (!data) {
         res.status(404).json({
            success: false,
            message: "No borrowed books found",
         });
      }
      res.status(200).json({
         success: true,
         message: "Borrowed books summary retrieved successfully",
         data,
      });
   } catch (error) {
      res.status(500).json({
         success: false,
         message: "Internal Server Error",
         error,
      });
   }
};

export { borrowCreate, bookborrowGet };
