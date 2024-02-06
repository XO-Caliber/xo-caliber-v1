import { adminProcedure, authProcedure, firmProcedure, publiceProcedure, router } from "./trpc";
import { db } from "@/lib/db";
import { TRPCError } from "@trpc/server";
import bcrypt from "bcrypt";
import { user } from "@/types/user";
import {
  sendEmailVerificationRequest,
  sendPasswordResetRequest
} from "@/lib/resend/sendEmailRequest";
import crypto from "crypto";
import { z } from "zod";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { getRandomImageUrl } from "@/components/utils/RandomProfileGenerator";
import { authRouter } from "./routers/auth";
import { dashboardRouter } from "./routers/dashboard";
import { homeRouter } from "./routers/home";
import { categoryRouter } from "./routers/QARouter/category";
import { questionRouter } from "./routers/QARouter/question";
import { answerRouter } from "./routers/QARouter/answer";

export const appRouter = router({
  auth: authRouter,
  dashboard: dashboardRouter,
  home: homeRouter,
  category: categoryRouter,
  question: questionRouter,
  answer: answerRouter
});

export type AppRouter = typeof appRouter;
