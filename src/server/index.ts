import { router } from "./trpc";
import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";
import { homeRouter } from "./routers/home";
import { categoryRouter } from "./routers/QARouter/category";
import { questionRouter } from "./routers/QARouter/question";
import { answerRouter } from "./routers/QARouter/answer";
import { noteRouter } from "./routers/note";
import { checkRouter } from "./routers/CheckListRouter/checklist";
import { coverletterRouter } from "./routers/coverletter";
import { paymentRouter } from "./routers/payment";

export const appRouter = router({
  auth: authRouter,
  dashboard: dashboardRouter,
  home: homeRouter,
  category: categoryRouter,
  question: questionRouter,
  answer: answerRouter,
  note: noteRouter,

  checklist: checkRouter,

  coverletter: coverletterRouter,
  payment: paymentRouter
});

export type AppRouter = typeof appRouter;
