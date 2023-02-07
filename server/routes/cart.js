import express from "express";
import * as cartController from "../controllers/cart.js";
import isAuth from "../middleware/auth.js";
const router = express.Router();

router.get("/:userId", isAuth, cartController.viewCart);
router.post("/:userId", isAuth, cartController.addToCart);

export default router;
