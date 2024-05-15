import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { nullable, z } from "zod";
import { use } from "react";

export const dashboardRouter = router({
  getUserTimeLine: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const results = await db.user.findUnique({
      where: {
        id: input
      },
      include: {
        Timeline: true
      }
    });
    return results?.Timeline;
  }),
  addUserTimeline: publiceProcedure
    .input(
      z.object({ userId: z.string(), description: z.string(), date: z.string(), title: z.string() })
    )
    .mutation(async ({ input }) => {
      const { userId, title, description, date } = input;
      await db.timeline.create({
        data: {
          title: title,
          description: description,
          Date: date,
          User: {
            connect: {
              id: userId
            }
          }
        }
      });
      return { success: true };
    }),
  deleteTimeLine: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.timeline.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  selectCase: publiceProcedure
    .input(z.object({ id: z.string(), case1: z.string() }))
    .mutation(async ({ input }) => {
      const { id, case1 } = input;
      await db.user.update({
        where: {
          id: id
        },
        data: {
          selectedCase: case1
        }
      });
      return { success: true };
    }),
  analysedCase: publiceProcedure
    .input(z.object({ id: z.string(), case2: z.string() }))
    .mutation(async ({ input }) => {
      const { id, case2 } = input;
      await db.user.update({
        where: {
          id: id
        },
        data: {
          selectedCase2: case2
        }
      });
      return { success: true };
    })
});
