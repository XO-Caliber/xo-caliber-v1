import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
// import { sendVerificationRequest } from "@/lib/resend/sendEmailRequest";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!
    }),
    LinkedInProvider({
      clientId: process.env.LINKEDIN_CLIENT_ID!,
      clientSecret: process.env.LINKEDIN_CLIENT_SECRET!,
      authorization: {
        params: { scope: "openid profile email" }
      },
      issuer: "https://www.linkedin.com",
      jwks_endpoint: "https://www.linkedin.com/oauth/openid/jwks",
      profile(profile, tokens) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture
        };
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailAddress: { label: "Email address", type: "email" },
        password: { label: "Password", type: "password" },
        type: { label: "Types", type: "type" }
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

        if (!user.hashedPassword) {
          throw new Error("Please login using Google or LinkedIn");
        }

        if (!user.isEmailVerified) {
          console.log("Email is not verified");
          throw new Error("Email is not verified");
        }
        const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);

        if (!passwordMatch) {
          console.log("Wrong password");
          throw new Error("Wrong password");
        }
        const { hashedPassword: newUserPassword, ...rest } = user;
        console.log(rest);
        return rest;
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  //! FOOL OF ME TO WRITE THESE CODE !
  callbacks: {
    // async signIn(args) {
    //   if (args.account?.type === "credentials") return true;

    //   if (args.account?.type === "oauth" && args.user.email && args.user.name) {
    //     if (args.account.provider === "linkedin" || args.account.provider === "google") {
    //       console.log("Hello from server");
    //       console.log("User", args.user);
    //       console.log("Account", args.account);
    //       console.log("Credentials", args.credentials);
    //       console.log("Profile", args.profile);
    //       console.log("Email", args.email);

    //       const isUserExist = await db.user.findUnique({
    //         where: { email: args.profile?.email }
    //       });

    //       if (isUserExist) {
    //         console.log("INDIVIDUAL");
    //         return true;
    //       }

    //       if (!isUserExist) {
    //         const isFirmExist = await db.firm.findUnique({
    //           where: { email: args.profile?.email }
    //         });

    //         if (isFirmExist) {
    //           console.log("FIRM");
    //           return true;
    //         }

    //         const isAssistantExist = await db.assistant.findUnique({
    //           where: { email: args.profile?.email }
    //         });

    //         if (isAssistantExist) {
    //           console.log("ASSISTANT");
    //           const newuser = { ...args.user, Role: "Assistant" };
    //           return newuser;
    //         }

    //         if (!isUserExist && !isFirmExist && !isAssistantExist) {
    //           console.log("NEW USER");
    //           return true;
    //         }
    //       }
    //     } else return false; // only google and linkedin for now
    //   }
    //   // return args.user;
    // },
    async jwt({ token, user, session }) {
      // console.log("jwt callbacks", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      // console.log("session callbacks", { session, token, user });
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
      }

      return session;
    }
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === "development"
};

export const getAuthSession = () => getServerSession(authOptions);
