"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const result = trpc.verifyEmail.useQuery(searchParams.token as unknown as void | undefined);
    if (result.data?.success) {
      return (
        <div>
          <h1>Email verified !</h1>
        </div>
      );
    } else {
      return <div>Invalid token</div>;
    }
  } else {
    return (
      <div>
        <h1>Verify Email</h1>
        No email verification token found. Check your email.
      </div>
    );
  }
};

export default VerifyEmailPage;
