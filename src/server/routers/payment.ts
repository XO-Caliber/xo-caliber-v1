import { publiceProcedure, router } from "../trpc";
import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10"
});

export const noteRouter = router({
  createCheckout: publiceProcedure.mutation(() => {
    return stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card", "us_bank_account"],
      line_items: [
        {
          price: "",
          quantity: 1
        }
      ],
      success_url: ``,
      cancel_url: ``
    });
  })
});
