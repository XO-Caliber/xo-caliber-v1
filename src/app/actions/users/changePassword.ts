"use server";

import { db } from "@/lib/db";
import bcrypt from "bcryptjs";

export const changePassword = async (resetPasswordToken: string, password: string) => {
  const user = await db.user.findUnique({
    where: {
      resetPasswordToken
    }
  });

  if (!user) {
    throw new Error("User not found");
  }

  const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
  if (!resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const today = new Date();

  if (today > resetPasswordTokenExpiry) {
    throw new Error("Token expired");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.user.update({
    where: {
      id: user.id
    },
    data: {
      hashedPassword,
      resetPasswordToken: null,
      resetPasswordTokenExpiry: null
    }
  });

  return "Password changed successfully";
};
