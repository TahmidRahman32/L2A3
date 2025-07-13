import { Router } from "express";
import { bookController } from "./book.controller";

const bookroute = Router();

bookroute.post("/", bookController.creatBook);
bookroute.get("/", bookController.getAllBooks);
bookroute.get("/:bookId", bookController.getBookById);
bookroute.patch("/:bookId", bookController.updateBook);
bookroute.delete("/:bookId", bookController.BookDelete);

export default bookroute;
