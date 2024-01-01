"use server";

import { db } from "@/lib/db";
import { sendPasswordResetRequest } from "@/lib/resend/sendVerificationRequest";
import crypto from "crypto";

export const resetPassword = async (email: string) => {
  console.log("Resetting password for ", email);

  const user = await db.user.findUnique({
    where: {
      email
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordToken = crypto.randomBytes(32).toString("base64url");
  const today = new Date();
  const resetPasswordTokenExpiry = new Date(today.setDate(today.getDate() + 1)); //24 hrs for now

  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      resetPasswordToken,
      resetPasswordTokenExpiry
    }
  });

  await sendPasswordResetRequest(email, resetPasswordToken);
  return "Password reset is sent";
};
