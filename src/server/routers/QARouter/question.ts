import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "@/server/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

export const questionRouter = router({
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
    await db.answer.deleteMany({
      where: {
        questionId: input
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
      where: {
        adminId: session.user.id
      },
      include: {
        questions: true
      }
    });

    return res;
  }),

  adminQuestionDelete: adminProcedure.input(z.string()).mutation(async ({ input }) => {
    await db.question.delete({
      where: {
        id: input
      }
    });
    await db.answer.deleteMany({
      where: {
        questionId: input
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
  }),

  importAdminQuestions: firmProcedure.mutation(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Delete existing categories for the firm and related questions
    const categoriesToDelete = await db.category.findMany({
      where: {
        firmId: session.user.id
      },
      include: {
        questions: true
      }
    });

    // Delete existing categories and related questions
    for (const category of categoriesToDelete) {
      await db.question.deleteMany({
        where: {
          categoryId: category.id
        }
      });
      await db.category.delete({
        where: {
          id: category.id
        }
      });
    }

    console.log("Related categories and questions deleted successfully");

    // Fetch admin categories with questions
    const adminCategories = await db.category.findMany({
      where: {
        Admin: {
          email: "vishnudarrshanorp@gmail.com"
        }
      },
      include: {
        questions: true
      }
    });

    // Create categories and questions for the firm
    for (const adminCategory of adminCategories) {
      const createdCategory = await db.category.create({
        data: {
          name: adminCategory.name,
          firmId: session.user.id // Connect category to firm
        }
      });

      for (const adminQuestion of adminCategory.questions) {
        await db.question.create({
          data: {
            categoryId: createdCategory.id,
            question: adminQuestion.question,
            mark: adminQuestion.mark
          }
        });
      }
    }

    // Delete existing answers for users of the firm
    const users = await db.user.findMany({
      where: {
        firmId: session.user.id
      }
    });

    for (const user of users) {
      await db.answer.deleteMany({
        where: {
          userId: user.id
        }
      });
    }

    return { success: true };
  }),

  getClientAdminQuestions: publiceProcedure.query(async () => {
    const res = await db.category.findMany({
      where: {
        Admin: {
          email: "vishnudarrshanorp@gmail.com"
        }
      },
      include: {
        questions: true
      }
    });
    return res;
  })
});
