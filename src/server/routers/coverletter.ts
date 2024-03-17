import { string, z } from "zod";
import { adminProcedure, firmProcedure, publiceProcedure, router } from "../trpc";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const coverletterRouter = router({
  addCoverLetter: publiceProcedure
    .input(z.object({ userId: z.string(), title: z.string() }))
    .mutation(async ({ input }) => {
      const { title, userId } = input;
      if (!userId) throw new TRPCError({ code: "UNAUTHORIZED" });

      await db.coverLetter.create({
        data: {
          title: title,
          firmId: userId
        }
      });
      return { success: true };
    }),
  getAdminCoverLetter: adminProcedure.input(z.string()).query(async ({ input }) => {
    const adminId = input;
    if (!adminId) throw new TRPCError({ code: "UNAUTHORIZED" });

    const coverLetters = await db.coverLetter.findMany({
      where: {
        firmId: adminId
      },
      include: {
        Section: true
      }
    });
    console.log(
      "cover letter: ",
      coverLetters.map((coverLetter) => coverLetter.title)
    );

    return coverLetters;
  })

  // getFirmCoverLetter: firmProcedure.input().query(async () => {

  //   if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
  //   const categories = await db.firm.findUnique({
  //     where: {
  //       email: session.user.email
  //     },
  //     include: {
  //       category: true
  //     }
  //   });
  //   return categories?.category;
  // })
});
