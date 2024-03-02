import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { adminProcedure, publiceProcedure, router } from "@/server/trpc";

import { z } from "zod";

export const checkRouter = router({
  addHeading: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    if (!session?.user.id) {
      throw new Error("");
    }
    await db.checkHeading.create({
      data: {
        name: input,
        adminId: session.user.id
      }
    });
    return { success: true };
  }),
  getHeading: adminProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.admin.findUnique({
      where: {
        adminId: session?.user.id
      },
      include: {
        CheckHeading: true
      }
    });
    return heading?.CheckHeading;
  }),
  getSubHeading: adminProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.checkHeading.findMany({
      include: {
        subHeading: true
      }
    });

    return heading;
  }),
  getCheckListSubHeading: adminProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.checkHeading.findMany({
      include: {
        subHeading: {
          include: {
            Checklist: true
          }
        }
      }
    });

    return heading;
  }),
  deleteHeading: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checkHeading.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  deleteSubHeading: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checkSubHeading.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  deleteCheckList: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checklist.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  addSubHeading: adminProcedure
    .input(z.object({ name: z.string(), checkHeadingId: z.string() }))
    .mutation(async ({ input }) => {
      const { checkHeadingId, name } = input;
      const session = await getAuthSession();
      await db.checkSubHeading.create({
        data: {
          name: name,
          checkHeadingId: checkHeadingId
        }
      });
      return { success: true };
    }),
  addCheckList: adminProcedure
    .input(z.object({ name: z.string(), checkSubHeadingId: z.string() }))
    .mutation(async ({ input }) => {
      const { name, checkSubHeadingId } = input;
      await db.checklist.create({
        data: {
          name: name,
          checkSubHeadingId: checkSubHeadingId
        }
      });
      return { success: true };
    })
});
