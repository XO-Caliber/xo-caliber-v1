import { publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { user } from "@/types/user";
import { sendEmailVerificationRequest } from "@/lib/resend/sendVerificationRequest";
import crypto from "crypto";

export const appRouter = router({
  register: publiceProcedure.input(user).mutation(async (userData) => {
    const { name, emailAddress, password } = userData.input;

    const exist = await db.user.findUnique({
      where: {
        email: emailAddress
      }
    });

    if (exist) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    const emailVerificationToken = crypto.randomBytes(32).toString("base64url");

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name: name,
        email: emailAddress,
        hashedPassword: hashedPassword,
        emailVerificationToken
      }
    });

    await sendEmailVerificationRequest(emailAddress, emailVerificationToken);

    return { success: true };
  })
});

export type AppRouter = typeof appRouter;
