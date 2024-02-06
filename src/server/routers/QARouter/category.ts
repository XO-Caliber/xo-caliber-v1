import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const categoryRouter = router({
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
  })
});
