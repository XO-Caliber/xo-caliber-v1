import type { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailAddress: { label: "Email address", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        console.log(credentials);
        console.log("Hello from server");
        if (!credentials?.emailAddress || !credentials.password) {
          console.log("Nothing");
          return null;
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.emailAddress
          }
        });

        if (!user) {
          console.log("User does not exist");
          return null;
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!passwordMatch) {
          console.log("Wrong password");
          return null;
        }

        return user;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === "development"
};
