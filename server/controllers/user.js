import User from "../models/user.js";
import { userValidation } from "../validators/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import {
  passError,
  raiseValidationError,
  alreadyExistsError,
} from "../utils/errors.js";

import { isAdmin, raiseConfidentialError } from "../utils/auth.js";

export const login = async (req, res, next) => {
  try {
    const { error } = userValidation(req?.body);
    if (error) raiseValidationError(error);

    const { email, password } = req?.body;

    const foundUser = await User.findOne({ email }).exec();
    if (!foundUser) raiseConfidentialError("Email Not Found!");
    // if (!foundUser) raiseConfidentialError();

    const { _id, isAdmin } = foundUser;

    const isMatched = await bcrypt.compare(password, foundUser.password);
    if (!isMatched) raiseConfidentialError("Wrong Password!");
    // if (!isMatched) raiseConfidentialError();

    const token = jwt.sign(
      { _id, email, isAdmin },
      process.env.TOKEN_SECRET
      // { expiresIn: "5h" }
    );
    return res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    passError(error, next);
  }
};

export const signUp = async (req, res, next) => {
  try {
    // isAdmin(req);
    const { error } = userValidation(req?.body);
    if (error) raiseValidationError(error);

    const { email, password } = req?.body;
    const existingUser = await User.findOne({ email }).exec();

    if (existingUser) alreadyExistsError("User", "email");

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      ...req.body,
      password: hashedPassword,
    });
    const savedUser = await newUser.save();
    return res.status(201).json({
      success: true,
      data: savedUser,
      //   data: {
      //     email: savedUser.email,
      //     isAdmin: savedUser.isAdmin,
      //   },
    });
  } catch (error) {
    passError(error, next);
  }
};
