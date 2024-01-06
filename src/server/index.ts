import { adminProcedure, authProcedure, firmProcedure, publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { user } from "@/types/user";
import {
  sendEmailVerificationRequest,
  sendPasswordResetRequest
} from "@/lib/resend/sendEmailRequest";
import crypto from "crypto";
import { z } from "zod";

export const appRouter = router({
  // REGISTER USER -------------------------------------------------------
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
  //RESET PASSWORD -------------------------------------------------------
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
  //VERIFY PASSWORD TOKEN -------------------------------------------------------
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
  // CHNAGE PASSWORD -------------------------------------------------------
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
    }),
  verifyEmail: publiceProcedure.input(z.string().nullish()).query(async (userData) => {
    const token = userData.input;

    const user = await db.user.findUnique({
      where: {
        emailVerificationToken: token as string
      }
    });

    if (!user) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }

    await db.user.update({
      where: {
        emailVerificationToken: token as string
      },
      data: {
        isEmailVerified: true,
        emailVerificationToken: null
      }
    });

    return { success: true };
  }),
  addFirm: adminProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    const email = input;

    const user = await db.user.findUnique({
      where: {
        email
      }
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    } else if (user.role === "FIRM" || user.role === "ASSISTANT" || user.role === "ADMIN") {
      throw new TRPCError({ code: "BAD_REQUEST" });
    } else if (!user.isEmailVerified) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const makeFirm = await db.firm.findUnique({
      where: {
        email
      }
    });

    if (makeFirm) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    await db.firm.create({
      data: {
        firmId: user.id,
        name: user.name,
        email: user.email
      }
    });

    await db.user.update({
      where: {
        id: user.id
      },
      data: {
        role: "FIRM"
      }
    });
    return { success: true };
  }),
  addAssistant: firmProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    const email = input;
    const user = await db.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    } else if (user.role === "FIRM" || user.role === "ASSISTANT" || user.role === "ADMIN") {
      throw new TRPCError({ code: "BAD_REQUEST" });
    } else if (!user.isEmailVerified) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }
    const makeAssistant = await db.assistant.findUnique({
      where: {
        email
      }
    });
    if (makeAssistant) {
      throw new TRPCError({ code: "CONFLICT" });
    }
    await db.assistant.create({
      data: {
        assistantId: user.id,
        name: user.name,
        email: user.email
      }
    });

    await db.user.update({
      where: {
        id: user.id
      },
      data: {
        role: "ASSISTANT"
      }
    });
    return { success: true };
  })
  // addClient: firmProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
  //   const email = input;
  //   const user = await db.user.findUnique({
  //     where: {
  //       email
  //     }
  //   });
  //   if (!user) {
  //     throw new TRPCError({ code: "NOT_FOUND" });
  //   } else if (user.Firm || user.firmId) {
  //     throw new TRPCError({ code: "BAD_REQUEST" });
  //   } else if (!user.isEmailVerified) {
  //     throw new TRPCError({ code: "FORBIDDEN" });
  //   }

  //   const firm = await db.firm.findUnique({
  //     where: {
  //       email: user.email
  //     },
  //     include: {
  //       User: true
  //     }
  //   });

  //   if (!firm) {
  //     throw new TRPCError({ code: "NOT_FOUND" });
  //   }

  //   const isUserInFirm = firm.User.some((u: { id: string }) => u.id === user.id);
  //   if (isUserInFirm) {
  //     throw new TRPCError({ code: "CONFLICT", message: "User is already in the firm." });
  //   }

  //   if (isUserInFirm) {
  //     throw new TRPCError({ code: "CONFLICT" });
  //   }
  //   await db.user.update({
  //     where: {
  //       id: user.id
  //     },
  //     data: {
  //       firmId: firm.firmId,
  //       Firm:firm
  //     }
  //   });
  //   await db.firm.update({
  //     where: {
  //       email: user.email
  //     },
  //     data: {
  //       User: {
  //         connect: {
  //           id: user.id
  //         }
  //       }
  //     }
  //   });
  // })
});

export type AppRouter = typeof appRouter;
