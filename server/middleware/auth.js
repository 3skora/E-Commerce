import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuth = async (req, res, next) => {
  try {
    const header = req.get("Authorization");
    if (!header) {
      const error = new Error("No Authorization Header is Supplied!");
      error.statusCode = 401;
      throw error;
    }
    const [bearer, token] = header.split(" ");
    if (bearer !== "Bearer" && bearer !== "bearer") {
      const error = new Error("Token must be a Bearer token");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken) {
      const error = new Error("Invalid Token!");
      error.statusCode = 401;
      throw error;
    }
    req.user = await User.findById(decodedToken._id).exec();
    next();
  } catch (error) {
    console.log("🚀 ~ file: auth.js:33 ~ isAuth ~ error");
    if (!error.statusCode) {
      error.message = "Invalid Token!";
      error.statusCode = 401;
    }
    req.authError = error;
    next();
  }
};

export default isAuth;
