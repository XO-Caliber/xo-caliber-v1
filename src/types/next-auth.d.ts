import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { type DefaultSession, type DefaultUser } from "next-auth";

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: string;
    stripeCustomerId: string;
    isActive: Boolean;
    expToken: number;
  }
}
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: DefaultSession["user"] & {
      id: string;
      role: string;
      stripeCustomerId: string;
      isActive: Boolean;
    };
  }

  interface User extends DefaultUser {
    role: string;
    stripeCustomerId: string;
    isActive: Boolean;
  }
}
