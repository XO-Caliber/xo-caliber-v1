"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "./ui/Button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "./ui/Card";
import { useMemo } from "react";
import { type Stripe, loadStripe } from "@stripe/stripe-js";

// const STRIPE_PUBLISHABLE_KEY = process.env.STRIPE_PUBLISHABLE_KEY as string;

export function PaymentCard() {
  const { data: hasFirm } = trpc.home.checkHasFirm.useQuery();

  const useStripe = () => {
    const stripe = useMemo<Promise<Stripe | null>>(
      () => loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!),
      []
    );

    return stripe;
  };

  const createCheckout = trpc.payment.createCheckout.useMutation();
  const stripePromise = useStripe();

  async function checkout() {
    console.log("HAS FIRM", hasFirm);
    const response = await createCheckout.mutateAsync(hasFirm!);
    const stripe = await stripePromise;

    const { error } = await stripe!.redirectToCheckout({
      sessionId: response.id
    });
    console.log(error);
    if (error) {
      alert("Something went wrong!");
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
          <span className="text-[50px] font-bold">{hasFirm ? "$350" : "$500"}</span>/mo
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
