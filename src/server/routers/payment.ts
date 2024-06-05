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

    if (!session?.user || !session.user.stripeCustomerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    let priceId = hasFirm ? env.PRICE_ID_WITH_FIRM : env.PRICE_ID_WITHOUT_FIRM;

    const trialDays = user.trialUsed ? 0 : 7;

    const checkoutSession = await stripe.checkout.sessions.create({
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
        trial_period_days: trialDays
      }
    });

    if (!user.trialUsed) {
      await db.user.update({
        where: { id: session.user.id },
        data: { trialUsed: true }
      });
    }

    return checkoutSession;
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
  }),

  cancelSubscription: publiceProcedure.mutation(async () => {
    const session = await getAuthSession();

    if (!session?.user || !session.user.stripeCustomerId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const user = await db.user.findUnique({
      where: {
        id: session.user.id
      }
    });
    if (!user?.stripeSubscriptionId) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const subscription = await stripe.subscriptions.update(user?.stripeSubscriptionId, {
      cancel_at_period_end: true
      // metadata : {payingUserEmail : session.user?.email!}
    });
    return { success: true, data: subscription };
  })
});
