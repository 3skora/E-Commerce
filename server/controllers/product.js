import Product from "../models/product.js";
import { productValidation } from "../validators/product.js";
import { raiseValidationError, passError } from "../utils/errors.js";
import { isLoggedIn } from "../utils/auth.js";

export const addProduct = async (req, res, next) => {
  try {
    const { error } = productValidation(req?.body);
    if (error) raiseValidationError(error);
    const newProduct = new Product({ ...req.body });
    const savedProduct = await newProduct.save();
    return res.status(201).json({
      success: true,
      data: savedProduct,
    });
  } catch (error) {
    passError(error, next);
  }
};

export const getAllProducts = async (req, res, next) => {
  try {
    // isLoggedIn(req);
    // console.log("🚀 ~ file: product.js:21 ~ getAllProducts ~ req", req.user);
    const allProducts = await Product.find({}).exec();
    res.status(200).json({
      success: true,
      data: allProducts,
    });
  } catch (error) {
    passError(error, next);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const { id } = req?.params;
    const product = await Product.findById(id).exec();
    res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    passError(error, next);
  }
};
