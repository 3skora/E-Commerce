import express from "express";
import * as productController from "../controllers/product.js";
const router = express.Router();

router.post("/", productController.addProduct);
router.get("/", productController.getAllProducts);
router.get("/:id", productController.getProduct);

export default router;
