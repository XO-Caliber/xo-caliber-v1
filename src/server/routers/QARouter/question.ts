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
  }),

  importAdminQuestions: firmProcedure.mutation(async () => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });

    // Delete existing categories for the firm and related questions
    const getCat = await db.category
      .findMany({
        where: {
          firmId: session.user.id
        },
        include: {
          questions: true
        }
      })
      .then(async (categories) => {
        console.log("Categories fetched successfully");

        // Loop through categories and delete related questions
        for (const category of categories) {
          await db.question.deleteMany({
            where: {
              categoryId: category.id
            }
          });
        }

        console.log("Related questions deleted successfully");

        categories.map(
          async (category) =>
            await db.category.deleteMany({
              where: {
                id: category.id
              }
            })
        );

        return categories; // Optionally return the fetched categories if needed
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
        throw error; // Throw error to handle it further if needed
      });

    // Fetch all admin categories with questions
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

    // Create an array to store all category creation promises
    const createCategoryPromises = adminCategories.map(async (adminCategory) => {
      // Create the category for the firm
      for (const adminCategory of adminCategories) {
        // Create the category for the firm
        const createdCategory = await db.category.create({
          data: {
            name: adminCategory.name,
            Firm: {
              connect: {
                firmId: session.user.id
              }
            }
          }
        });
        // Map over the questions in the admin category and create them for the firm
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

      // Wait for all question creation promises to resolve
    });

    // Wait for all category creation promises to resolve
    await Promise.all(createCategoryPromises);
    return { success: true };
  })
});
