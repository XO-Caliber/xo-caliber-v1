import { z } from "zod";
import { publiceProcedure, router } from "./trpc";

export const appRouter = router({
  register: publiceProcedure
    .input(
      z.object({
        emailAddress: z.string().email(),
        password: z.string(),
        passwordConfirm: z.string()
      })
    )
    .mutation(async (data) => {
      console.log(data);
      console.log("Hello from trpc");
    })
});

export type AppRouter = typeof appRouter;
