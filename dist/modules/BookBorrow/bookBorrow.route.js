"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const borrow_controller_1 = require("./borrow.controller");
const bookBorrowRoute = (0, express_1.Router)();
bookBorrowRoute.post("/", borrow_controller_1.borrowCreate);
bookBorrowRoute.get("/", borrow_controller_1.bookborrowGet);
exports.default = bookBorrowRoute;
