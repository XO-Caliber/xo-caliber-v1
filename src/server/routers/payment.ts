import { env } from "process";
import { publiceProcedure, router } from "../trpc";
import Stripe from "stripe";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { z } from "zod";
import { TRPCError } from "@trpc/server";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2024-04-10"
});

export const paymentRouter = router({
  createCheckout: publiceProcedure.mutation(async () => {
    const session = await getAuthSession();
    console.log("stripeCustomerId", session?.user.stripeCustomerId);
    return stripe.checkout.sessions.create({
      mode: "payment",
      customer: session?.user.stripeCustomerId,
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
  }),

  checkCheckout: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    console.log(session?.user.stripeCustomerId, session?.user.id);
    const dbData = await db.user.findUnique({
      where: {
        id: session?.user.id
      }
    });

    if (dbData?.stripeCustomerId === session?.user.stripeCustomerId) {
      return { success: true };
    } else {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
  })
});
