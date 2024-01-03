"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const result = trpc.verifyEmail.useQuery(searchParams.token as unknown as void | undefined);
    if (result.data?.success) {
      return (
        <section
          className="absolute left-0 top-0 flex h-full w-full
                items-center justify-center overflow-hidden
                bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
        >
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
            <CheckCircle size={150} color="green" className="mb-10" />
            <h1 className="mb-10 text-3xl font-bold">Email verified !</h1>
            <Button variant={"primary"}>
              <Link href={"/"}>Go to Home</Link>
            </Button>
          </div>
        </section>
      );
    } else {
      return (
        <section
          className="absolute left-0 top-0 flex h-full w-full
            items-center justify-center overflow-hidden
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
        >
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
            <XCircle size={150} color="red" className="mb-10" />
            <h1 className="mb-10 text-3xl font-bold">Invalid token</h1>
            <Button variant={"primary"}>
              <Link href={"/signup"}>Go to SignUp</Link>
            </Button>
          </div>
        </section>
      );
    }
  } else {
    return (
      <section
        className="absolute left-0 top-0 flex h-full w-full
            items-center justify-center overflow-hidden
            bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
      >
        <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
          <XCircle size={150} color="red" className="mb-10" />
          <h1 className="mb-10 text-3xl font-bold">No email token found!</h1>
          <Button variant={"primary"}>
            <Link href={"/signup"}>Go to SignUp</Link>
          </Button>
        </div>
      </section>
    );
  }
};

export default VerifyEmailPage;
