import { publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { user } from "@/types/user";
import {
  sendEmailVerificationRequest,
  sendPasswordResetRequest
} from "@/lib/resend/sendVerificationRequest";
import crypto from "crypto";
import { z } from "zod";

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
  }),
  resetPassword: publiceProcedure
    .input(
      z.object({
        email: z.string().email()
      })
    )
    .mutation(async (userData) => {
      const { email } = userData.input;

      console.log("Resetting password for ", email);

      const user = await db.user.findUnique({
        where: {
          email
        }
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
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
      return { success: true };
    }),
  verifyPasswordToken: publiceProcedure.input(z.string().nullish()).query(async (userData) => {
    const token = userData.input;

    const user = await db.user.findUnique({
      where: {
        resetPasswordToken: token as string
      }
    });
    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    return { success: true };
  }),
  changePassword: publiceProcedure
    .input(
      z.object({
        resetPasswordToken: z.string(),
        password: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { resetPasswordToken, password } = input;

      const user = await db.user.findUnique({
        where: {
          resetPasswordToken
        }
      });

      if (!user) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }

      const resetPasswordTokenExpiry = user.resetPasswordTokenExpiry;
      if (!resetPasswordTokenExpiry) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }

      const today = new Date();

      if (today > resetPasswordTokenExpiry) {
        throw new TRPCError({ code: "BAD_REQUEST" });
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

      return { success: true };
    })
});

export type AppRouter = typeof appRouter;
