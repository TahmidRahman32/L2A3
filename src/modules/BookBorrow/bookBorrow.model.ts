import mongoose, { Schema } from "mongoose";
import { IBookBorrow, IBorrowModel } from "./bookBorrow.interface";
const BookBorrowSchema = new Schema<IBookBorrow>(
   {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book", required: true },
      quantity: { type: Number, required: true },
      dueDate: { type: Date, required: true },
   },
   { versionKey: false }
);
BookBorrowSchema.statics.deductCopies = async function (bookId: mongoose.Types.ObjectId, quantity: number): Promise<boolean> {
   const Book = mongoose.model("Book");
   const result = await Book.updateOne({ _id: bookId, copies: { $gte: quantity } }, { $inc: { copies: -quantity } });
   return result.modifiedCount > 0;
};

export default mongoose.model<IBookBorrow, IBorrowModel>("BookBorrow", BookBorrowSchema);
