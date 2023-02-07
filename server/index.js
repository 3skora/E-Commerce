import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import productRouter from "./routes/product.js";
import userRouter from "./routes/user.js";
import cartRouter from "./routes/cart.js";
import orderRouter from "./routes/order.js";
import isAuth from "./middleware/auth.js";
import { errorMiddlerWare } from "./utils/errors.js";

const app = express();
const port = process.env.PORT;

// ====================== MiddleWares =========================
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(isAuth);
app.use("/products", productRouter);
app.use("/users", userRouter);
app.use("/cart", cartRouter);
app.use("/pay", orderRouter);

// ==================== Home Route ====================
app.get("/", (req, res) => {
  res.status(200).send("Welcome To Our E-Commerce System");
});

//=====================Error MiddleWare ====================
app.use(errorMiddlerWare);
app.use((_req, res) => {
  res.status(404).json({
    success: false,
    message: "Page Not Found",
  });
});

// ================= Database connection ===========================
const connectionParams = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};
mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.DATABASE_URL, connectionParams)
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running at port: ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
