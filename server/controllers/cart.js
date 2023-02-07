import Cart from "../models/cart.js";
import { addToCartValidation } from "../validators/cart.js";
import { raiseValidationError, passError } from "../utils/errors.js";
import { isLoggedIn } from "../utils/auth.js";

export const viewCart = async (req, res, next) => {
  try {
    isLoggedIn(req);
    // console.log("🚀 ~ file: cart.js:21 ~ getAllCarts ~ req", req?.user);
    const { userId } = req?.params;
    const cart = await Cart.find({ userId }).populate("items.productId").exec();
    res.status(200).json({
      success: true,
      data: cart[0],
    });
  } catch (error) {
    passError(error, next);
  }
};

export const addToCart = async (req, res, next) => {
  try {
    isLoggedIn(req);
    // console.log("🚀 ~ file: cart.js:24 ~ addToCart ~ req?.body", req?.body);
    const { error } = addToCartValidation(req?.body);
    if (error) raiseValidationError(error);

    const { userId } = req?.params;
    const { productId, quantity } = req?.body;

    await Cart.findOneAndUpdate(
      { userId },
      { $pull: { items: { productId } } },
      { new: true, runValidators: true, useFindAndModify: true }
    ).exec();

    let updatedCart;
    if (quantity != 0) {
      updatedCart = await Cart.findOneAndUpdate(
        { userId },
        { $addToSet: { items: [req?.body] } },
        { new: true, runValidators: true, useFindAndModify: true }
      ).exec();
    }

    return res.status(201).json({
      success: true,
      data: updatedCart,
    });
  } catch (error) {
    passError(error, next);
  }
};
