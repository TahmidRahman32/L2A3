"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const book_route_1 = __importDefault(require("../modules/books/book.route"));
const bookBorrow_route_1 = __importDefault(require("../modules/BookBorrow/bookBorrow.route"));
const routers = (0, express_1.Router)();
routers.use("/api/books", book_route_1.default);
routers.use("/api/borrow", bookBorrow_route_1.default);
exports.default = routers;
