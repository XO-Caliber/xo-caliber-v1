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
    <Card className="relative z-50 w-[900px]  bg-gradient-to-r from-[#dd0839]  to-[#39468f] p-20">
      <CardHeader>
        <CardTitle className="mb-4 text-center text-3xl leading-8 text-white">
          Unlock Your Immigration Visas Journey through Our User-Friendly Self-Service Web Platform
        </CardTitle>
        <CardDescription className="text-center font-bold text-white">
          Activate 7 days trial period NOW!!!
        </CardDescription>
      </CardHeader>
      <CardContent></CardContent>
      <CardFooter className="w-full">
        <Button
          variant={"outline"}
          className="w-full font-semibold"
          onClick={() => {
            checkout().catch(console.error);
          }}
        >
          START YOUR SUBSCRIPTION (Y)EARLY
        </Button>
      </CardFooter>
    </Card>
  );
}
