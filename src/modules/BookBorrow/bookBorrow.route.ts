import { Router } from "express";
import { bookborrowGet, borrowCreate } from "./borrow.controller";

const bookBorrowRoute = Router();

bookBorrowRoute.post("/",borrowCreate);
bookBorrowRoute.get("/",bookborrowGet); 

export default bookBorrowRoute;