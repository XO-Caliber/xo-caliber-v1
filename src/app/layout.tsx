import type { Metadata } from "next";
import { Inter as FontSans } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Navbar } from "@/components/Navbar";
import Providers from "@/components/trpc/Providers";
import { Toaster } from "@/components/ui/Toaster";
import { NextAuthProvider } from "@/components/next-auth/Providers";

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
      {/* <NextAuthProvider> */}
      <Providers>
        <body className={cn("min-h-screen bg-background font-sans antialiased", fontSans.variable)}>
          <Navbar />
          {children}
          <Toaster />
        </body>
      </Providers>
      {/* </NextAuthProvider> */}
    </html>
  );
}
