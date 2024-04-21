import { db } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { getAuthSession } from "../auth/[...nextauth]/authOptions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  const payload = await req.text();
  const response = JSON.parse(payload);
  const session = await getAuthSession();

  const sig = req.headers.get("Stripe-Signature");
  const dateTime = new Date(response?.created * 1000).toLocaleDateString();

  try {
    let event = stripe.webhooks.constructEvent(payload, sig!, process.env.STRIPE_WEBHOOK_SECRET!);

    console.log("Event: ", event?.type);
    console.log(dateTime);

    switch (event.type) {
      case "charge.succeeded":
        const paymentIntentSucceeded = event.data.object;
        // console.log("Success: ", paymentIntentSucceeded);
        console.log("id: ", paymentIntentSucceeded.id);
        console.log("email: ", paymentIntentSucceeded.billing_details.email);
        console.log("User: ", session?.user.id as string);
        console.log("User from stripe: ", paymentIntentSucceeded.customer);
        // const response = await db.user.update({
        //   where: {
        //     id: paymentIntentSucceeded.customer as string
        //   },
        //   data: {
        //     ispaid: true,
        //     stripeId: paymentIntentSucceeded.id,
        //     stripeEmail: paymentIntentSucceeded.billing_details.email,
        //     paidDate: dateTime
        //   }
        // });

        // console.log("Details", response.stripeEmail);
        // console.log("Details", response.ispaid);
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
