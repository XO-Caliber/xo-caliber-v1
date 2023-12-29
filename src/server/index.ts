import { publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
import { user } from "@/types/user";

export const appRouter = router({
  register: publiceProcedure.input(user).mutation(async (userData) => {
    const { name, emailAddress, password } = userData.input;

    const exist = await db.user.findUnique({
      where: {
        email: emailAddress
      }
    });
    if (exist) {
      throw new TRPCError({ code: "UNAUTHORIZED" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
      data: {
        name: name,
        email: emailAddress,
        hashedPassword: hashedPassword
      }
    });

    return { success: true };
  })
});

export type AppRouter = typeof appRouter;