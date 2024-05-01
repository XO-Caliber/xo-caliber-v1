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

    console.log("Event: ", event?.type);
    console.log(dateTime);

    switch (event.type) {
      case "charge.succeeded":
        const paymentIntentSucceeded = event.data.object;
        console.log("id: ", paymentIntentSucceeded.id);
        console.log("email: ", paymentIntentSucceeded.billing_details.email);
        console.log("User from stripe: ", paymentIntentSucceeded.customer);
        try {
          const response = await db.user.update({
            where: {
              stripeCustomerId: paymentIntentSucceeded.customer as string
            },
            data: {
              isPaid: true,
              stripeId: paymentIntentSucceeded.id,
              stripeEmail: paymentIntentSucceeded.billing_details.email,
              paidDate: dateTime
            }
          });
          console.log("User data updated successfully:", response);
        } catch (error) {
          console.error("Error updating user data:", error);
          throw error;
        }
        console.log("Paid 👍");
        break;
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
    return NextResponse.json({ status: "success", event: event.type });
  } catch (error) {
    return NextResponse.json({ status: "Failed", error });
  }
}
