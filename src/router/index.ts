import { Router } from "express";
import bookroute from "../modules/books/book.route";
import bookBorrowRoute from "../modules/BookBorrow/bookBorrow.route";

const routers = Router();


routers.use("/api/books", bookroute);
routers.use("/api/borrow",bookBorrowRoute );
export default routers;
