import { isLoggedIn } from "../utils/auth.js";
import Stripe from "stripe";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const pay = async (req, res) => {
  try {
    // isLoggedIn(req);
    const { amount } = req?.body;
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: "usd",
    });

    res.status(200).send(paymentIntent.client_secret);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
