import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: {
        type: Number,
        default: 1,
      },
      _id: false,
    },
  ],
  totalPrice: {
    type: Number,
    default: 0,
  },
});

export default mongoose.model("Cart", cartSchema);
