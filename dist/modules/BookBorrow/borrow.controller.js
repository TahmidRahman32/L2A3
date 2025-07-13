"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookborrowGet = exports.borrowCreate = void 0;
const bookBorrow_model_1 = __importDefault(require("./bookBorrow.model"));
const borrowCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const data = await BookBorrowModel.create(req.body);
        const data = new bookBorrow_model_1.default(req.body, { new: true, runValidators: true });
        // const deductCopies = await data.deductCopies(req.body.quantity);
        const deductCopies = yield bookBorrow_model_1.default.deductCopies(req.body.book, req.body.quantity);
        yield data.save();
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "book borrow failed",
            error,
        });
    }
});
exports.borrowCreate = borrowCreate;
const bookborrowGet = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield bookBorrow_model_1.default.aggregate([
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
        ], { new: true, runValidators: true });
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
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error",
            error,
        });
    }
});
exports.bookborrowGet = bookborrowGet;
