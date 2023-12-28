import { z } from "zod";
import { publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const appRouter = router({
  register: publiceProcedure
    .input(
      z.object({
        emailAddress: z.string().email(),
        password: z.string(),
        passwordConfirm: z.string()
      })
    )
    .mutation(async (userData) => {
      const { emailAddress, password, passwordConfirm } = userData.input;

      const exist = await db.user.findUnique({
        where: {
          email: emailAddress
        }
      });
      if (exist) {
        throw new TRPCError({ code: "UNAUTHORIZED" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);

      if (!exist) {
        await prisma.user.create({
          data: {
            email: emailAddress,
            hashedPassword: hashedPassword
          }
        });
      }
      return { success: true };
    })
});

export type AppRouter = typeof appRouter;
