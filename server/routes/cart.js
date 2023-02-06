import express from "express";
import * as cartController from "../controllers/cart.js";
import isAuth from "../middleware/auth.js";
const router = express.Router();

router.post("/", cartController.createCart);
router.post("/:id/addToCart", cartController.addToCart);
router.get("/:userId", isAuth, cartController.viewCart);

export default router;
