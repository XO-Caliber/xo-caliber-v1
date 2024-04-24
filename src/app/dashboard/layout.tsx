import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PaymentCard } from "@/components/PaymentCard";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Cover letter generator app"
};

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  return (
    <>
      <Navbar />
      {session?.user.isPaid || session?.user.role !== "INDIVIDUAL" ? (
        <main>{children}</main>
      ) : (
        <>
          <Image
            src="/images/dashboard_bg.png"
            alt="Home BG"
            fill
            className="absolute grid h-full w-full place-items-center object-top pl-56"
          />
          <main className="absolute grid h-full w-full place-items-center backdrop-blur-sm">
            <PaymentCard />
          </main>
        </>
      )}
    </>
  );
}
