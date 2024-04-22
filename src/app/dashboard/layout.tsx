import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PaymentCard } from "@/components/PaymentCard";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Cover letter generator app"
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  return (
    <>
      <Navbar />
      {session?.user.isPaid ? (
        <main>{children}</main>
      ) : (
        <main className="absolute grid h-full w-full place-items-center backdrop-blur-md">
          <PaymentCard />
        </main>
      )}
    </>
  );
}
