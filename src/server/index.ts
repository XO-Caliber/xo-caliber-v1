import { publiceProcedure, router } from "./trpc";

export const appRouter = router({
  test: publiceProcedure.query(() => {
    return "hello";
  })
});

export type AppRouter = typeof appRouter;
