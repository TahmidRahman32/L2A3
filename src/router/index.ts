import { Router } from "express";
import bookroute from "../modules/books/book.route";
import bookBorrowRoute from "../modules/BookBorrow/bookBorrow.route";

const routers = Router();


routers.use("/books", bookroute);
routers.use("/borrow",bookBorrowRoute );
export default routers;
