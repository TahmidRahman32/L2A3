import mongoose, { Model, Types } from "mongoose";

export interface IBookBorrow {
   book: Types.ObjectId;
   quantity: number;
   dueDate: Date;
}
export interface IBookBorrowMathod extends Document { 
   book: mongoose.Types.ObjectId;
   quantity: number;
   deductCopies: (quantity: number) => Promise<boolean>;
}
export interface IBorrowModel extends Model<IBookBorrow, {}, IBookBorrowMathod> {
   deductCopies(bookId: mongoose.Types.ObjectId, quantity: number): Promise<boolean>;
}
