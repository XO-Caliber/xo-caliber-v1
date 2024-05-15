import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { PaymentCard } from "@/components/PaymentCard";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";
import Image from "next/image";

export const metadata: Metadata = {
  title: "workspaces",
  description: "Cover letter generator app"
};

export default async function WorkspaceLayout({ children }: { children: React.ReactNode }) {
  const session = await getAuthSession();
  console.log("isPaid: ", session?.user.isActive);
  return (
    <>
      <Navbar />
      {/* {session?.user.isPaid || session?.user.role !== "INDIVIDUAL" ? ( */}
      <main>{children}</main>
      {/* ) : (
        <>
          <Image
            src="/images/coverletter_bg.png"
            alt="Workspace BG"
            fill
            className="absolute grid h-full w-full place-items-center overflow-hidden object-top pl-52"
          />
          <main className="absolute grid h-full w-full place-items-center backdrop-blur-sm">
            <PaymentCard />
          </main>
        </>
      )} */}
    </>
  );
}
