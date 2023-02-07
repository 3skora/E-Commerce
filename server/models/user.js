import mongoose from "mongoose";
const Schema = mongoose.Schema;

const userSchema = Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    // required: true,
    default: false,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "Cart",
  },
});

export default mongoose.model("User", userSchema);
