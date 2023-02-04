import express from "express";
import * as userController from "../controllers/user.js";
const router = express.Router();

router.post("/signup", userController.signUp);
// router.get("/", userController.getAllProducts);
// router.get("/:id", userController.getProduct);

export default router;
