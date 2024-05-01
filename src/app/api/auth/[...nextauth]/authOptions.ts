import { getServerSession, type NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import LinkedInProvider from "next-auth/providers/linkedin";
import bcrypt from "bcrypt";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "@/lib/db";
import Stripe from "stripe";
import { Adapter } from "next-auth/adapters";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
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
          image: profile.picture,
          role: profile.role,
          isPaid: false,
          stripeCustomerId: ""
        };
      }
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {
        emailAddress: { label: "Email address", type: "email" },
        password: { label: "Password", type: "password" }
        // role: { label: "Types", type: "type" }
      },
      //@ts-expect-error
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
        if (user) {
          const passwordMatch = await bcrypt.compare(credentials.password, user.hashedPassword);
          if (user.role === "FIRM") {
            const isFirm = await db.firm.findUnique({
              where: {
                email: credentials.emailAddress
              }
            });
            if (!isFirm) {
              console.log("Firm doesn't exist");
              throw new Error("Firm doesn't exist");
            }
            if (!passwordMatch) {
              console.log("Wrong password");
              throw new Error("Wrong password");
            }
            return user;
          }
          if (user.role === "ASSISTANT") {
            const isAssistant = await db.assistant.findUnique({
              where: {
                email: credentials.emailAddress
              }
            });
            if (!isAssistant) {
              console.log("Assistant doesn't exist");
              throw new Error("Assistant doesn't exist");
            }
            if (!passwordMatch) {
              console.log("Wrong password");
              throw new Error("Wrong password");
            }
            return user;
          }

          if (!passwordMatch) {
            console.log("Wrong password");
            throw new Error("Wrong password");
          }
          console.log(user);
          return user;
        }
        return Promise.resolve(null);
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: "/login"
  },
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session.isPaid) {
        token.isPaid = session.isPaid;
      }
      console.log("jwt callbacks", { token, user, session });
      if (user) {
        return {
          ...token,
          id: user.id,
          role: user.role,
          stripeCustomerId: user.stripeCustomerId,
          isPaid: user.isPaid
        };
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callbacks", { session, token, user });
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.role = token.role;
        session.user.stripeCustomerId = token.stripeCustomerId;
        session.user.isPaid = token.isPaid;
      }

      return session;
    }
  },
  events: {
    createUser: async (message) => {
      console.log("NEW USER");
      console.log("NEW USER");
      console.log(message.user);
      console.log("NEW USER");
      console.log("NEW USER");
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
        apiVersion: "2024-04-10"
      });

      await stripe.customers
        .create({
          email: message.user.email!,
          name: message.user.name!
        })
        .then(async (customer) => {
          return db.user.update({
            where: { id: message.user.id },
            data: {
              stripeCustomerId: customer.id
            }
          });
        });
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
  debug: process.env.NODE_ENV === "development"
};

export const getAuthSession = () => getServerSession(authOptions);
