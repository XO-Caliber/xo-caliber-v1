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
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { use } from "react";
import { getRandomImageUrl } from "@/components/utils/RandomProfileGenerator";

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
    const RandomProfile = getRandomImageUrl();
    const hashedPassword = await bcrypt.hash(password, 10);
    await db.user.create({
      data: {
        name: name,
        email: emailAddress,
        hashedPassword: hashedPassword,
        emailVerificationToken,
        image: RandomProfile
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
    const session = await getAuthSession();
    const email = input;
    const user = await db.user.findUnique({
      where: {
        email
      }
    });
    if (!session?.user.email) {
      throw new TRPCError({ code: "BAD_REQUEST", message: "Invalid session email" });
    }
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    } else if (user.role === "ADMIN" || user.role === "FIRM") {
      throw new TRPCError({ code: "BAD_REQUEST" });
    } else if (!user.isEmailVerified) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    const makeAssistant = await db.assistant.findUnique({
      where: {
        email
      }
    });
    const firm = await db.firm.findUnique({
      where: {
        email: session.user.email
      }
    });
    console.log(user);

    console.log(session?.user.email);
    console.log(makeAssistant?.email);

    const isFirmPresent = await db.assistant.findUnique({
      where: {
        email: user.email
      },
      include: {
        firm: true
      }
    });
    console.log(isFirmPresent);
    if (makeAssistant) {
      if (isFirmPresent?.firm) {
        throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
      } else {
        await db.firm.update({
          where: {
            firmId: firm?.firmId
          },
          data: {
            assistant: {
              connect: {
                email: user.email
              }
            }
          }
        });
      }
      if (!isFirmPresent) {
        throw new TRPCError({ code: "CONFLICT" });
      }
    }
    if (!makeAssistant) {
      const assistant = await db.assistant.create({
        data: {
          assistantId: user.id,
          name: user.name,
          email: user.email
        }
      });
      if (!assistant) {
        throw new TRPCError({ code: "NOT_FOUND" });
      }
      console.log(firm);

      await db.firm.update({
        where: {
          email: session.user.email
        },
        data: {
          assistant: {
            connect: {
              assistantId: assistant.assistantId
            }
          }
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
    }

    return { success: true };
  }),

  addClient: firmProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    const session = await getAuthSession();
    if (!session?.user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const email = input;
    const user = await db.user.findUnique({
      where: {
        email
      }
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    } else if (user.role === "ADMIN" || user.role === "ASSISTANT" || user.role === "FIRM") {
      throw new TRPCError({ code: "BAD_REQUEST" });
    } else if (!user.isEmailVerified) {
      throw new TRPCError({ code: "FORBIDDEN" });
    }

    // const firm = await db.firm.findUnique({
    //   where: {
    //     email: user.email
    //   },
    //   include: {
    //     User: true
    //   }
    // });

    // if (!firm) {

    // }

    // const isUserInFirm = firm.User.some((u: { id: string }) => u.id === user.id);
    const isHavingFirm = await db.user.findUnique({
      where: {
        email
      },
      include: {
        Firm: true
      }
    });
    console.log(isHavingFirm);

    if (isHavingFirm?.Firm) {
      throw new TRPCError({ code: "CONFLICT" });
    }

    await db.firm.update({
      where: {
        email: session.user.email
      },
      data: {
        User: {
          connect: {
            id: user.id
          }
        }
      }
    });
    return { success: true };
  }),
  leaveFirm: publiceProcedure.mutation(async ({ ctx }) => {
    const session = await getAuthSession();
    if (!session?.user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const user = await db.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        Firm: true
      }
    });
    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    }
    await db.user.update({
      where: {
        email: session.user.email
      },
      data: {
        firmId: null
      }
    });
    return { success: true };
  }),
  changeClientCount: adminProcedure
    .input(
      z.object({
        count: z.number(),
        email: z.string().email()
      })
    )
    .mutation(async (userData) => {
      const { count, email } = userData.input;
      const clientCount = await db.firm.findUnique({
        where: {
          email
        }
      });
      if (clientCount?.userCount === count) {
        throw new TRPCError({ code: "CONFLICT" });
      }
      await db.firm.update({
        where: {
          email: email
        },
        data: {
          userCount: count
        }
      });
      return { success: true };
    }),
  getAllUser: firmProcedure.input(z.number()).query(async ({ input }) => {
    const page = input;

    const results = await db.user.findMany({
      skip: (page - 1) * 10,
      take: 12
    });

    return results;
  }),
  getAllFirm: adminProcedure.input(z.number()).query(async ({ input }) => {
    const page = input;

    const results = await db.firm.findMany({
      skip: (page - 1) * 10, // Adjusting skip based on page number
      take: 14 // Always take 10 items per page
    });

    return results;
  }),
  getAllAssistant: firmProcedure.input(z.number()).query(async ({ input }) => {
    const page = input;

    const results = await db.assistant.findMany({
      skip: (page - 1) * 10,
      take: 12
    });

    return results;
  }),
  getFirmUser: firmProcedure.input(z.string()).query(async ({ input }) => {
    const firmId = input;

    const results = await db.user.findMany({
      where: {
        firmId: firmId
      }
    });

    return results;
  }),
  getFirmAssistant: firmProcedure.input(z.string()).query(async ({ input }) => {
    const firmId = input;
    if (!firmId) {
      throw new TRPCError({ code: "BAD_REQUEST" });
    }

    const results = await db.assistant.findMany({
      where: {
        firmId: firmId
      }
    });

    return results;
  }),

  clientList: firmProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const clientList = await db.firm.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        User: true
      }
    });
    return clientList?.User;
  }),
  assistantList: firmProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const assistantList = await db.firm.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        assistant: true
      }
    });
    return assistantList?.assistant;
  }),
  assignAssistant: firmProcedure
    .input(
      z.object({
        user: z.string().email(),
        assistant: z.string().email()
      })
    )
    .mutation(async ({ input }) => {
      const { user, assistant } = input;
      await db.assistant.update({
        where: {
          email: assistant
        },
        data: {
          User: {
            connect: {
              email: user
            }
          }
        }
      });
      return { success: true };
    }),
  addFirmCategory: firmProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const category = input;
    await db.category.create({
      data: {
        name: category,
        Firm: {
          connect: {
            email: session.user.email
          }
        }
      }
    });
    return { success: true };
  }),
  getFirmCategory: firmProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const categories = await db.firm.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        category: true
      }
    });
    return categories?.category;
  }),
  deleteFirmCategory: firmProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.category.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  addFirmQuestion: firmProcedure
    .input(
      z.object({
        question: z.string(),
        mark: z.number(),
        categoryId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { question, mark, categoryId } = input;
      await db.question.create({
        data: {
          question: question,
          mark: mark,
          category: {
            connect: {
              id: categoryId
            }
          }
        }
      });
      return { success: true };
    }),
  getFirmQuestions: firmProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const res = await db.category.findMany({
      include: {
        questions: true
      }
    });
    const firmQuestions = res.filter((questions) => questions.firmId === session.user.id);
    return firmQuestions;
  }),
  firmQuestionDelete: firmProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.question.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  addAdminCategory: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const category = input;
    await db.category.create({
      data: {
        name: category,
        Admin: {
          connect: {
            email: session.user.email
          }
        }
      }
    });
    return { success: true };
  }),
  getAdminCategory: adminProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const categories = await db.admin.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        category: true
      }
    });
    return categories?.category;
  }),
  deleteAdminCategory: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.category.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  addAdminQuestion: adminProcedure
    .input(
      z.object({
        question: z.string(),
        mark: z.number(),
        categoryId: z.string()
      })
    )
    .mutation(async ({ input }) => {
      const { question, mark, categoryId } = input;
      await db.question.create({
        data: {
          question: question,
          mark: mark,
          category: {
            connect: {
              id: categoryId
            }
          }
        }
      });
      return { success: true };
    }),
  getAdminQuestions: adminProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const res = await db.category.findMany({
      include: {
        questions: true
      }
    });
    const adminQuestions = res.filter((questions) => questions.adminId === session.user.id);
    return adminQuestions;
  }),
  adminQuestionDelete: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.question.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  getClientQuestions: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const userData = await db.user.findUnique({
      where: {
        email: session?.user.email
      }
    });
    const questions = await db.category.findMany({
      include: {
        questions: true
      }
    });
    const clientQuestion = questions.filter((questions) => questions.firmId === userData?.firmId);
    return clientQuestion;
  })
});

export type AppRouter = typeof appRouter;
