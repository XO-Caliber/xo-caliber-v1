"use server";
import { ChangePasswordForm } from "@/components/pages/auth/ChangePasswordForm";
import ResetPasswordPage from "@/components/pages/auth/ResetPassword";
import { db } from "@/lib/db";
import React from "react";

interface ResetPasswordProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = async ({ searchParams }: ResetPasswordProps) => {
  if (searchParams.token) {
    const user = await db.user.findUnique({
      where: {
        resetPasswordToken: searchParams.token as string
      }
    });
    if (!user) {
      return <div>Invalid token</div>;
    }

    return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
  } else {
    return <ResetPasswordPage />;
  }
};

export default page;
