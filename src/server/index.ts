import { router } from "./trpc";
import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";
import { homeRouter } from "./routers/home";
import { categoryRouter } from "./routers/QARouter/category";
import { questionRouter } from "./routers/QARouter/question";
import { answerRouter } from "./routers/QARouter/answer";
import { noteRouter } from "./routers/note";
import { coverletterRouter } from "./routers/coverletter";

export const appRouter = router({
  auth: authRouter,
  dashboard: dashboardRouter,
  home: homeRouter,
  category: categoryRouter,
  question: questionRouter,
  answer: answerRouter,
  note: noteRouter,
  coverletter: coverletterRouter
});

export type AppRouter = typeof appRouter;
