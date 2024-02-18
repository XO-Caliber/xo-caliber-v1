import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { db } from "@/lib/db";
import { publiceProcedure, router } from "@/server/trpc";

import { z } from "zod";

export const answerRouter = router({
  addUserAnswer: publiceProcedure
    .input(
      z.object({
        questionId: z.string(),
        userId: z.string(),
        answer: z.enum(["YES", "NO"])
      })
    )
    .mutation(async ({ input }) => {
      const { questionId, userId, answer } = input;

      // Check if there is an existing answer for the given questionId and userId
      const existingAnswer = await db.answer.findFirst({
        where: {
          questionId,
          userId
        }
      });

      if (existingAnswer) {
        // If an answer exists, update it
        console.log("update");
        await db.answer.update({
          where: {
            id: existingAnswer.id
          },
          data: {
            answer
          }
        });
      } else {
        console.log("create");
        // If no answer exists, create a new one
        await db.answer.create({
          data: {
            questionId,
            userId,
            answer
          }
        });
      }

      return { success: true };
    }),

  getUserAnswer: publiceProcedure
    .input(
      z.object({
        userId: z.string()
      })
    )
    .query(async ({ input }) => {
      const { userId } = input;
      console.log("getUserAnswer");
      const userAnswers = await db.answer.findMany({
        where: {
          userId: userId
        }
      });
      console.log("index.ts" + userAnswers[0].answer);
      return userAnswers;
    }),
  getFirmSpiderAnswer: publiceProcedure.query(async () => {
    const session = await getAuthSession();
    const user = await db.user.findUnique({
      where: {
        id: session?.user.id
      },
      include: {
        Firm: true
      }
    });
    // Fetch firm category IDs
    const firmCategories = await db.category.findMany({
      where: {
        firmId: user?.firmId
      }
    });

    // Extract category IDs from firmCategories
    const firmCategoryIds = firmCategories.map((category) => category.id);

    // Fetch questions belonging to firm categories
    const firmQuestions = await db.question.findMany({
      where: {
        categoryId: {
          in: firmCategoryIds
        }
      }
    });

    // Extract question IDs from firmQuestions
    const firmQuestionIds = firmQuestions.map((question) => question.id);

    // Fetch user answers for firm questions
    const userAnswers = await db.answer.findMany({
      where: {
        userId: session?.user.id,
        questionId: {
          in: firmQuestionIds
        }
      }
    });

    // Fetch and map category data for each question in userAnswers
    const userAnswersWithCategory = await Promise.all(
      userAnswers.map(async (answer) => {
        // Fetch category data for the question
        const question = await db.question.findUnique({
          where: {
            id: answer.questionId
          }
        });
        const category = await db.category.findUnique({
          where: {
            id: question?.categoryId
          }
        });
        const categoryName = category ? category.name : null;
        const mark = question ? question.mark : null;

        // Add category name to the userAnswer object
        return {
          ...answer,
          category: categoryName,
          mark: mark
        };
      })
    );

    return userAnswersWithCategory;
  }),
  getAdminSpiderAnswer: publiceProcedure.query(async () => {
    const session = await getAuthSession();

    // Fetch admin category IDs
    const adminCategories = await db.category.findMany({
      where: {
        Admin: {
          email: "vishnudarrshanorp@gmail.com"
        }
      }
    });

    // Extract category IDs from adminCategories
    const adminCategoryIds = adminCategories.map((category) => category.id);

    // Fetch questions belonging to admin categories
    const adminQuestions = await db.question.findMany({
      where: {
        categoryId: {
          in: adminCategoryIds
        }
      }
    });

    // Extract question IDs from adminQuestions
    const adminQuestionIds = adminQuestions.map((question) => question.id);

    // Fetch user answers for admin questions
    const userAnswers = await db.answer.findMany({
      where: {
        userId: session?.user.id,
        questionId: {
          in: adminQuestionIds
        }
      }
    });

    // Fetch and map category data for each question in userAnswers
    const userAnswersWithCategory = await Promise.all(
      userAnswers.map(async (answer) => {
        // Fetch category data for the question
        const question = await db.question.findUnique({
          where: {
            id: answer.questionId
          }
        });
        const category = await db.category.findUnique({
          where: {
            id: question?.categoryId
          }
        });
        const categoryName = category ? category.name : null;
        const mark = question ? question.mark : null;

        // Add category name to the userAnswer object
        return {
          ...answer,
          category: categoryName,
          mark: mark
        };
      })
    );

    return userAnswersWithCategory;
  })
});
