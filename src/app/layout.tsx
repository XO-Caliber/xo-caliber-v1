import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import Providers from "@/context/TrpcProviders";
import { Toaster } from "@/components/ui/Toaster";
import { NextAuthProvider } from "@/context/NextAuthProviders";
import { PaymentCard } from "@/components/PaymentCard";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans"
});

export const metadata: Metadata = {
  title: "XO Caliber",
  description: "Cover letter generator app"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <NextAuthProvider>
        <Providers>
          <body
            className={cn(
              "min-h-screen select-none bg-background font-sans text-lg antialiased",
              fontSans.variable
            )}
          >
            <Navbar />
            <main className="absolute grid h-full w-full place-items-center backdrop-blur-md">
              <PaymentCard />
            </main>
            <div className="pointer-events-none -z-10">{children}</div>
            <Toaster />
          </body>
        </Providers>
      </NextAuthProvider>
    </html>
  );
}
