"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { useMemo } from "react";
import { type Stripe, loadStripe } from "@stripe/stripe-js";

// const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY as string;

export function PaymentCard() {
  const useStripe = () => {
    const stripe = useMemo<Promise<Stripe | null>>(
      () =>
        loadStripe(
          "pk_test_51MfMulSHLHmLyjpspBcqvqhvnK19uoYZvpUtfAL4wVRSFK1XIz7gavU8bI4gVfLSyrpMmgpem04IM1fZmGTDwNcS00mqAxIc4M"
        ),
      []
    );

    return stripe;
  };

  const createCheckout = trpc.payment.createCheckout.useMutation();
  const stripePromise = useStripe();

  async function checkout() {
    const response = await createCheckout.mutateAsync();
    const stripe = await stripePromise;

    if (stripe !== null) {
      await stripe.redirectToCheckout({
        sessionId: response.id
      });
    }
  }

  return (
    <Card className="relative z-50 w-[350px]">
      <CardHeader>
        <CardTitle>Individual user</CardTitle>
        <CardDescription>
          All the features including creating an dediting questions and cover letter
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="my-4 text-xl font-semibold">
          <span className="text-[50px] font-bold">$500</span>/mo
        </p>
      </CardContent>
      <CardFooter className="w-full">
        <Button
          variant={"dark"}
          className="w-full"
          onClick={() => {
            checkout().catch(console.error);
          }}
        >
          Buy
        </Button>
      </CardFooter>
    </Card>
  );
}
