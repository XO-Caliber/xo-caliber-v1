import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { z } from "zod";

export const dashboardRouter = router({
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
    })
});
