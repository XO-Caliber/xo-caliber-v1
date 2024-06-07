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
          isActive: false,
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
        // console.log(credentials);
        // console.log("Hello from server");
        if (!credentials?.emailAddress || !credentials.password) {
          // console.log("Nothing");
          throw new Error("Missing credentials");
        }

        const user = await db.user.findUnique({
          where: {
            email: credentials.emailAddress
          }
        });

        if (!user) {
          // console.log("User does not exist");
          throw new Error("user does not exist");
        }

        if (!user.hashedPassword) {
          throw new Error("Please login using Google or LinkedIn");
        }

        if (!user.isEmailVerified) {
          // console.log("Email is not verified");
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
              // console.log("Firm doesn't exist");
              throw new Error("Firm doesn't exist");
            }
            if (!passwordMatch) {
              // console.log("Wrong password");
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
              // console.log("Assistant doesn't exist");
              throw new Error("Assistant doesn't exist");
            }
            if (!passwordMatch) {
              // console.log("Wrong password");
              throw new Error("Wrong password");
            }
            return user;
          }

          if (!passwordMatch) {
            // console.log("Wrong password");
            throw new Error("Wrong password");
          }
          // console.log(user);
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
    async jwt({ token, user }) {
      const currentTimestamp = Math.floor(new Date().getTime() / 1000); // Current time in seconds
      const isTokenExpired = currentTimestamp > token.expToken;

      console.log("Before if block:");
      console.log("Token Object:", token);
      console.log("Current Timestamp:", currentTimestamp);
      console.log("EXP Timestamp:", token.expToken);
      console.log("Is Token Expired:", isTokenExpired);
      console.log("User Object:", user);
      console.log(new Date().getTime());

      if (user || isTokenExpired) {
        console.log("Token is being refreshed");
        const freshUser = user || (await db.user.findUnique({ where: { id: token.id } }));
        token = {
          email: freshUser.email,
          name: freshUser.name,
          picture: freshUser.image,
          id: freshUser.id,
          role: freshUser.role,
          stripeCustomerId: freshUser.stripeCustomerId,
          isActive: freshUser.isActive,
          expToken: Math.floor(new Date().getTime() / 1000) + 60
        };

        console.log("After refreshing token:");
        // console.log("Token Object:", token);
      } else {
        console.log("Token is not refreshed:");
      }

      return token;
    },
    async session({ session, token }) {
      console.log("SESSION");
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        role: token.role,
        stripeCustomerId: token.stripeCustomerId,
        isActive: token.isActive
      };
      return session;
    }
  },

  events: {
    createUser: async (message) => {
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
