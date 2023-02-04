import jwt from "jsonwebtoken";
import User from "../models/user.js";

const isAuth = async (req, res, next) => {
  try {
    const header = req.get("Authorization");
    console.log("🚀 ~ file: auth.js:7 ~ isAuth ~ header", header);
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
    console.log("🚀 ~ file: auth.js:13 ~ isAuth ~ token", token);

    // if (token === "p%7:,DMf9G,$:K?") {
    //   req.user = {
    //     email: "admin@admin.com",
    //     isAdmin: true,
    //   };
    //   next();
    //   return;
    // }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    if (!decodedToken) {
      const error = new Error("Invalid Token!");
      error.statusCode = 401;
      throw error;
    }
    req.user = await User.findById(decodedToken._id).exec();
    next();
  } catch (error) {
    if (!error.statusCode) {
      error.message = "Invalid Token!";
      error.statusCode = 401;
    }
    req.authError = error;
    next();
  }
};

export default isAuth;
