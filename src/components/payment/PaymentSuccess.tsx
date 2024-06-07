"use client";
import React, { useEffect } from "react";
import { useSession } from "next-auth/react";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import { redirect } from "next/navigation";
import { signOut } from "next-auth/react";

export const PaymentSuccess = () => {
  const { data: session, update } = useSession();

  const { data } = trpc.payment.checkCheckout.useQuery();
  // console.log(session?.user.isActive);
  // console.log(session);
  useEffect(() => {
    if (data?.success === true) {
      update({ isActive: true });
      signOut({ callbackUrl: "/login" });
    }
  }, [data]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p>Success</p>
        <Link href="/" className="text-blue-500">
          home
        </Link>
      </main>
    </>
  );
};
