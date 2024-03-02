import { db } from "@/lib/db";
import { adminProcedure, firmProcedure, router } from "../trpc";
import { TRPCError } from "@trpc/server";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { nullable, z } from "zod";
import { use } from "react";

export const dashboardRouter = router({});
