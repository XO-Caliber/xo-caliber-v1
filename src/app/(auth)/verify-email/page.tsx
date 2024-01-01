import { db } from "@/lib/db";
import React from "react";

interface VerifyEmailPageProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const VerifyEmailPage = async ({ searchParams }: VerifyEmailPageProps) => {
  if (searchParams.token) {
    const user = await db.user.findUnique({
      where: {
        emailVerificationToken: searchParams.token as string
      }
    });
    if (!user) {
      return <div>Invalid token</div>;
    }

    await db.user.update({
      where: {
        emailVerificationToken: searchParams.token as string
      },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null
      }
    });

    return (
      <div>
        <h1>
          Email verified for <b>{user.email}</b>!
        </h1>
      </div>
    );
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
