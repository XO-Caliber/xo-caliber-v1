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
  createCheckout: publiceProcedure.input(z.boolean()).mutation(async ({ input }) => {
    const hasFirm = input;
    const session = await getAuthSession();
    console.log("stripeCustomerId", session?.user.stripeCustomerId);

    if (!session?.user || !session.user.stripeCustomerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let priceId = hasFirm ? env.PRICE_ID_WITH_FIRM : env.PRICE_ID_WITHOUT_FIRM;

    return stripe.checkout.sessions.create({
      mode: "subscription",
      customer: session?.user.stripeCustomerId,
      payment_method_types: ["card"],
      line_items: [
        {
          price: priceId,
          quantity: 1
        }
      ],
      success_url: `${env.HOST_NAME}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${env.HOST_NAME}/`,
      subscription_data: {
        metadata: {
          payingUserId: session.user.id
        },
        trial_period_days: 7
      }
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
