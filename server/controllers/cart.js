import Cart from "../models/cart.js";
import { cartValidation, addToCartValidation } from "../validators/cart.js";
import { raiseValidationError, passError } from "../utils/errors.js";
import { isLoggedIn } from "../utils/auth.js";

export const createCart = async (req, res, next) => {
  try {
    const { error } = cartValidation(req?.body);
    if (error) raiseValidationError(error);
    const newCart = new Cart({ ...req.body });
    const savedCart = await newCart.save();
    return res.status(201).json({
      success: true,
      data: savedCart,
    });
  } catch (error) {
    passError(error, next);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    console.log("🚀 ~ file: cart.js:24 ~ addToCart ~ req?.body", req?.body);
    // const { error } = addToCartValidation(req?.body);
    // if (error) raiseValidationError(error);

    const { id } = req?.params;
    const { productId, quantity } = req?.body;

    const updatedCart = await Cart.findByIdAndUpdate(
      id,
      //   { $set: req?.body },
      { $addToSet: { items: [req?.body] } },
      { new: true, runValidators: true, useFindAndModify: true }
    ).exec();

    return res.status(201).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    passError(error, next);
  }
};

export const viewCart = async (req, res, next) => {
  try {
    isLoggedIn(req);
    // console.log("🚀 ~ file: cart.js:21 ~ getAllCarts ~ req", req?.user);
    const { userId } = req?.params;
    const cart = await Cart.find({ userId }).exec();
    res.status(200).json({
      success: true,
      data: cart[0],
    });
  } catch (error) {
    passError(error, next);
  }
};
