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

  //! WHY NEVER USE???
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
    })
});
