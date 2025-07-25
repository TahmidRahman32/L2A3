"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_controller_1 = require("./book.controller");
const bookroute = (0, express_1.Router)();
bookroute.post("/", book_controller_1.bookController.creatBook);
bookroute.get("/", book_controller_1.bookController.getAllBooks);
bookroute.get("/:bookId", book_controller_1.bookController.getBookById);
bookroute.patch("/:bookId", book_controller_1.bookController.updateBook);
bookroute.delete("/:bookId", book_controller_1.bookController.BookDelete);
exports.default = bookroute;
