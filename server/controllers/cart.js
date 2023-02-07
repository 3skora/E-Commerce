import Cart from "../models/cart.js";
import { addToCartValidation } from "../validators/cart.js";
import { raiseValidationError, passError } from "../utils/errors.js";
import { isLoggedIn } from "../utils/auth.js";
import Product from "../models/product.js";

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

    const { price } = await Product.findById(productId).exec();

    const foundCart = await Cart.findOne({
      userId,
      // "items.productId": productId,
      // items: { $elemMatch: { productId } },
    }).exec();

    let filteredProduct = foundCart?.items?.filter(
      (item) => item.productId == productId
    );

    const prevQuantity = filteredProduct[0]?.quantity || 0;
    if (prevQuantity != 0) {
      await Cart.findOneAndUpdate(
        { userId },
        {
          $pull: { items: { productId } },
          $inc: { totalPrice: -price * prevQuantity },
        },
        { new: true, runValidators: true, useFindAndModify: true }
      ).exec();
    }

    let updatedCart;
    if (quantity != 0) {
      updatedCart = await Cart.findOneAndUpdate(
        { userId },
        {
          $addToSet: { items: [req?.body] },
          $inc: { totalPrice: price * quantity },
        },
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
