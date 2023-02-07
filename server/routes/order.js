import express from "express";
import * as orderController from "../controllers/order.js";
import isAuth from "../middleware/auth.js";
const router = express.Router();

router.post("/", isAuth, orderController.pay);

export default router;
