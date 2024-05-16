import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import Providers from "@/context/TrpcProviders";
import { Toaster } from "@/components/ui/Toaster";
import { NextAuthProvider } from "@/context/NextAuthProviders";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "XO Caliber",
  description: "Cover letter generator app",
  icons: {
    icon: "/favicon.png"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <Providers>
          <body
            className={cn(
              "min-h-screen  bg-background  font-sans text-lg antialiased bg-dotted-spacing-3 bg-dotted-gray-200",
              fontSans.variable
            )}
          >
            {/* <Navbar /> */}
            {children}

            {/* <main className="absolute grid h-full w-full place-items-center backdrop-blur-md">
              <PaymentCard />
            </main> */}

            <Toaster />
          </body>
        </Providers>
      </NextAuthProvider>
    </html>
  );
}
