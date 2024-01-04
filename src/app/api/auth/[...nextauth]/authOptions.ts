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
  //! FOOL OF ME TO WRITE THESE CODE !
  callbacks: {
    async signIn(args) {
      if (args.account?.type === "credentials") return true;

      if (args.account?.type === "oauth" && args.user.email && args.user.name) {
        if (args.account.provider === "linkedin" || args.account.provider === "google") {
          console.log("Hello from server");
          console.log("User", args.user);
          console.log("Account", args.account);
          console.log("Credentials", args.credentials);
          console.log("Profile", args.profile);
          console.log("Email", args.email);

          // const isRole;

          // const user = await db.firm.findUnique({
          //   where: {
          //     email: args.user.email
          //   }
          // });
          // if (!user) {
          //   console.log("Creating user");
          //   await db.user.create({
          //     data: {
          //       name: args.user.name,
          //       email: args.user.email,
          //       image: args.user.image
          //     }
          //   });
          // }
          // console.log("User exist logging In");
          // return args.user;
        } else return false; // only google and linkedin for now
      }
      // return args.user;
    }
  },
  secret: process.env.NEXTAUTH_URL,
  debug: process.env.NODE_ENV === "development"
};

export const getAuthSession = () => getServerSession(authOptions);
