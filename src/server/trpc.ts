import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { TRPCError, initTRPC } from "@trpc/server";
const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
  const session = await getAuthSession();
  if (!session?.user || !session.user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
  const user = session.user;
  return opts.next({
    ctx: {
      user
    }
  });
});

const isAdmin = middleware(async (opts) => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || !user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (user.role === "ADMIN") {
    return opts.next({
      ctx: {
        user
      }
    });
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

const isFirm = middleware(async (opts) => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || !user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (user.role === "FIRM") {
    return opts.next({
      ctx: {
        user
      }
    });
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

const isAssistant = middleware(async (opts) => {
  const session = await getAuthSession();
  const user = session?.user;

  if (!user || !user.email) {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }

  if (user.role === "ASSISTANT") {
    return opts.next({
      ctx: {
        user
      }
    });
  } else {
    throw new TRPCError({ code: "UNAUTHORIZED" });
  }
});

// Base router and procedure helpers
export const router = t.router;
export const publiceProcedure = t.procedure;
export const authProcedure = t.procedure.use(isAuth);
export const adminProcedure = t.procedure.use(isAdmin);
export const firmProcedure = t.procedure.use(isFirm);
export const assistantProcedure = t.procedure.use(isAssistant);
