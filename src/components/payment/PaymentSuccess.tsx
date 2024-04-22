"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";

export const PaymentSuccess = () => {
  const { data: session, update } = useSession();

  const { data } = trpc.payment.checkCheckout.useQuery();
  console.log(session?.user.isPaid);
  console.log(session);
  useEffect(() => {
    if (data?.success === true) {
      update({ isPaid: true });
    }
  }, [data]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        Validating payment...
      </main>
    </>
  );
};
