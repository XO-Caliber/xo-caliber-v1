import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const response = JSON.parse(payload);

  const sig = req.headers.get("Stripe-Signature");
  const dateTime = new Date(response?.created * 1000).toISOString();

  try {
    let event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
    const subscription = event.data.object as Stripe.Subscription;

    switch (event.type) {
      case "customer.subscription.created":
        try {
          const response = await db.user.update({
            where: {
              stripeCustomerId: subscription.customer as string
            },
            data: {
              isActive: true,
              stripeSubscriptionId: subscription.id,
              paidDate: dateTime
            }
          });

          const user = await db.user.findUnique({
            where: {
              stripeCustomerId: subscription.customer as string
            }
          });

          if (user) {
            if (!user.trialUsed) {
              await db.user.update({
                where: {
                  stripeCustomerId: subscription.customer as string
                },
                data: { trialUsed: true }
              });
            }
          }

          console.log("User data updated successfully:", response);
        } catch (error) {
          console.error("Error updating user data:", error);
          throw error;
        }
        console.log("Paid 👍");
        break;

      case "customer.subscription.deleted":
        try {
          const response = await db.user.update({
            where: {
              stripeCustomerId: subscription.customer as string
            },
            data: {
              isActive: false
            }
          });
          console.log("User data updated successfully:", response);
        } catch (error) {
          console.error("Error updating user data:", error);
          throw error;
        }
        console.log("UnPaid 👎");
        break;

      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
