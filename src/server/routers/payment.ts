import { env } from "process";
import { publiceProcedure, router } from "../trpc";
import Stripe from "stripe";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10"
});

export const paymentRouter = router({
  createCheckout: publiceProcedure.mutation(async () => {
    const session = await getAuthSession();
    const data = await stripe.customers
      .create({
        email: session?.user.email!,
        name: session?.user.name!
      })
      .then(async (customer) => {
        return db.user.update({
          where: { id: session?.user.id },
          data: {
            stripeCustomerId: customer.id
          }
        });
      });

    return stripe.checkout.sessions.create({
      mode: "payment",
      customer: data.stripeCustomerId!,
      payment_method_types: ["card"],
      line_items: [
        {
          price: env.PRICE_ID,
          quantity: 1
        }
      ],
      success_url: `${env.HOST_NAME}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.HOST_NAME}/`
    });
  })
});
