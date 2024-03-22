import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "@/server/trpc";

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
  addFirmHeading: firmProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    if (!session?.user.id) {
      throw new Error("");
    }
    await db.checkHeading.create({
      data: {
        name: input,
        firmId: session.user.id
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
  getFirmHeading: firmProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.firm.findUnique({
      where: {
        firmId: session?.user.id
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
      where: {
        adminId: session?.user.id
      },
      include: {
        subHeading: true,
        Admin: true
      }
    });

    return heading;
  }),
  getFirmSubHeading: firmProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.checkHeading.findMany({
      where: {
        firmId: session?.user.id
      },
      include: {
        subHeading: true,
        Firm: true
      }
    });

    return heading;
  }),
  getCheckListSubHeading: adminProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.checkHeading.findMany({
      where: {
        adminId: session?.user.id
      },
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
  getFirmCheckListSubHeading: firmProcedure.query(async () => {
    const session = await getAuthSession();
    const heading = await db.checkHeading.findMany({
      where: {
        firmId: session?.user.id
      },
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
  deleteHeading: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checkHeading.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  deleteSubHeading: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checkSubHeading.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  deleteCheckList: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.checklist.delete({
      where: {
        id: input
      }
    });
    return { success: true };
  }),
  addSubHeading: publiceProcedure
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
  addCheckList: publiceProcedure
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
    }),
  getClientCheckList: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const userData = await db.user.findUnique({
      where: {
        id: input
      }
    });
    const checklists = await db.checkHeading.findMany({
      where: {
        firmId: userData?.firmId
      },
      include: {
        subHeading: {
          include: {
            Checklist: {
              include: {
                UserChecked: {
                  where: {
                    userId: input
                  }
                }
              }
            }
          }
        }
      }
    });
    return checklists;
  }),
  getClientAdminCheckList: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const userData = await db.user.findUnique({
      where: {
        id: input
      }
    });
    const checklists = await db.checkHeading.findMany({
      where: {
        Admin: {
          email: "ohnusaavyus@gmail.com"
        }
      },
      include: {
        subHeading: {
          include: {
            Checklist: {
              include: {
                UserChecked: {
                  where: {
                    userId: input
                  }
                }
              }
            }
          }
        }
      }
    });
    return checklists;
  }),
  getClientAnswer: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const result = await db.userChecked.findMany({
      where: {
        userId: input
      }
    });
    return result;
  }),
  addClientChecked: publiceProcedure
    .input(
      z.object({
        userId: z.string(),
        checkListId: z.string(),
        isChecked: z.boolean()
      })
    )
    .mutation(async ({ input }) => {
      const { userId, checkListId, isChecked } = input;
      const checkAnswered = await db.userChecked.findFirst({
        where: {
          checklistId: checkListId,
          userId: userId
        }
      });
      if (checkAnswered) {
        await db.userChecked.update({
          where: {
            id: checkAnswered.id
          },
          data: {
            isChecked: isChecked
          }
        });
        return { success: true };
      }
      await db.userChecked.create({
        data: {
          checklistId: checkListId,
          userId: userId,
          isChecked: true
        }
      });
      return { success: true };
    }),
  addReferenceLink: publiceProcedure
    .input(z.object({ id: z.string(), link: z.string() }))
    .mutation(async ({ input }) => {
      const { id, link } = input;
      await db.userChecked.update({
        where: {
          id: id
        },
        data: {
          referenceLink: link
        }
      });
      return { success: true };
    }),
  getUserHasFirm: publiceProcedure.input(z.string()).query(async ({ input }) => {
    const results = await db.user.findUnique({
      where: {
        id: input
      }
    });
    return results;
  })
});
