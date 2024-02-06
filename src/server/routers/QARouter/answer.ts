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
    })
});
