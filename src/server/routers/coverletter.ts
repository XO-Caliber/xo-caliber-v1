import { z } from "zod";
import { publiceProcedure, router } from "../trpc";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { TRPCError } from "@trpc/server";
import { db } from "@/lib/db";

export const coverletterRouter = router({
  addCoverLetter: publiceProcedure.input(z.string()).mutation(async ({ input }) => {
    const session = await getAuthSession();
    if (!session?.user.email) throw new TRPCError({ code: "UNAUTHORIZED" });
    const title = input;

    await db.coverLetter.create({
      data: {
        title: title,
        firmId: session.user.id
      }
    });
    return { success: true };
  })
});
