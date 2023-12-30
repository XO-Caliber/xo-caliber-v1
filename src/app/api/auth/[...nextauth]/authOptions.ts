import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import { trpc } from "@/app/_trpc/client";

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
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.emailAddress
          }
        });

        if (!user) {
          console.log("User does not exist");
          throw new Error("user does not exist");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
        if (!passwordMatch) {
          console.log("Wrong password");
          throw new Error("Wrong password");
        }

        return user;
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async signIn(args) {
      if (args.account?.type === "credentials") return true;

      if (args.account?.type === "oauth" && args.user.email && args.user.name) {
        if (args.account.provider === "linkedin" || args.account.provider === "google") {
          const user = await db.user.findUnique({
            where: {
              email: args.user.email
            }
          });
          if (!user) {
            const { mutate: registerUser } = trpc.register.useMutation({});
          }
        } else return false; // only google and linkedin for now
      }

      console.log("Hello from server");
      console.log("User", args.user);
      console.log("Account", args.account);

      return args.user;
    }
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === "development"
};

export const getAuthSession = () => getServerSession(authOptions);
