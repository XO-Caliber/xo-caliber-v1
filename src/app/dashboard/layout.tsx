import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Cover letter generator app"
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
