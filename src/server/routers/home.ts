import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  adminProcedure,
  assistantProcedure,
  firmProcedure,
  publiceProcedure,
  router
} from "../trpc";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";
import { z } from "zod";

export const homeRouter = router({
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
        Firm: true,
        Assistants: true
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

    await db.answer.deleteMany({
      where: {
        userId: session.user.id
      }
    });
    return { success: true };
  }),

  getClientFirm: publiceProcedure.query(async ({ ctx }) => {
    const session = await getAuthSession();
    if (!session?.user.email) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const results = await db.user.findUnique({
      where: {
        email: session.user.email
      },
      include: {
        Firm: true
      }
    });
    if (!results) {
      throw new Error("No Firm was found");
    }
    return results;
  }),
  getClientAssistants: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const results = await db.user.findUnique({
      where: {
        id: session?.user.id
      },
      include: {
        Assistants: true
      }
    });
    if (!results) {
      throw new Error("No assistant was found");
    }
    return results.Assistants.filter((user) => user.assistantId !== "");
  }),

  getAllUser: publiceProcedure.query(async () => {
    const results = await db.user.findMany({});

    return results.filter((user) => user.id !== "");
  }),

  getAllFirm: adminProcedure.query(async () => {
    const results = await db.firm.findMany({
      // Always take 10 items per page
    });

    return results.filter((user) => user.firmId !== "");
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

  //! WHY NEVER USE???
  getFirmAssistant: firmProcedure.query(async () => {
    const session = await getAuthSession();
    const results = await db.firm.findUnique({
      where: {
        firmId: session?.user.id
      },
      include: {
        assistant: true
      }
    });

    return results?.assistant;
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
  getAllUserList: adminProcedure.query(async () => {
    const userList = await db.user.findMany({
      where: {
        role: "INDIVIDUAL"
      }
    });
    const filteredUsers = userList.filter((data) => data.id !== "");
    return filteredUsers;
  }),
  getAssistantUser: assistantProcedure.query(async () => {
    const session = await getAuthSession();
    const assistantData = await db.assistant.findUnique({
      where: {
        assistantId: session?.user.id
      },
      include: {
        User: true
      }
    });
    const filteredUsers = assistantData?.User.filter((data) => data.id !== "");
    return filteredUsers;
  }),
  getAssistantsUser: publiceProcedure.input(z.string().email()).query(async ({ input }) => {
    const assistantData = await db.assistant.findUnique({
      where: {
        email: input
      },
      include: {
        User: true
      }
    });
    const filteredUsers = assistantData?.User.filter((data) => data.id !== "");
    return filteredUsers;
  }),
  getAssistantsFirm: assistantProcedure.input(z.string()).query(async ({ input }) => {
    const results = await db.assistant.findUnique({
      where: {
        assistantId: input
      },
      include: {
        firm: true
      }
    });
    return results?.firm;
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
        user: z.string(),
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
              id: user
            }
          }
        }
      });
      return { success: true };
    }),
  addFirm: adminProcedure.input(z.string().email()).mutation(async ({ ctx, input }) => {
    const email = input;

    const user = await db.user.findUnique({
      where: {
        email
      },
      include: {
        Firm: true
      }
    });

    if (!user) {
      throw new TRPCError({ code: "NOT_FOUND" });
    } else if (user.role === "FIRM" || user.role === "ASSISTANT" || user.role === "ADMIN") {
      throw new TRPCError({ code: "BAD_REQUEST" });
    } else if (user.Firm) {
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED" });
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
    await db.answer.deleteMany({
      where: {
        userId: user.id
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
      },
      include: {
        Firm: true
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
    } else if (user.Firm) {
      throw new TRPCError({ code: "METHOD_NOT_SUPPORTED" });
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
      await db.answer.deleteMany({
        where: {
          userId: user.id
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
    const firm = await db.firm.findUnique({
      where: {
        firmId: session.user.id
      },
      include: {
        User: true
      }
    });
    if (!firm?.userCount) {
      throw new Error("Limit reached");
    }
    if (firm?.User.length < firm?.userCount) {
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
    } else {
      throw new TRPCError({ code: "TOO_MANY_REQUESTS" });
    }

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
  checkHasFirm: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const check = await db.user.findUnique({
      where: {
        id: session?.user.id
      }
    });
    if (!check?.firmId) {
      return false;
    }
    return { success: true };
  })
});
