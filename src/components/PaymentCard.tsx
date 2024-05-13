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
    <Card className="relative z-50 w-[500px]">
      <CardHeader>
        <CardTitle className="mb-4 text-center leading-8">
          Empower Your Immigration Visas Journey through Our User-Friendly Self-Service Web Platform
        </CardTitle>
        <CardDescription className="text-center">
          Activate 7 days trial period NOW!!!
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="w-full">
        <Button
          variant={"dark"}
          className="w-full font-semibold"
          onClick={() => {
            checkout().catch(console.error);
          }}
        >
          Purchase Today
        </Button>
      </CardFooter>
    </Card>
  );
}
