import mongoose from "mongoose";
const Schema = mongoose.Schema;

const cartSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  items: [
    {
      product: {
        type: Schema.Types.ObjectId,
        ref: "Product",
      },
      quantity: Number,
    },
  ],
  totalPrice: {
    type: Number,
  },
});

export default mongoose.model("Cart", cartSchema);
