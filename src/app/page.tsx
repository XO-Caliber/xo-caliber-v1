import Header from "@/components/Header";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";
import AdminHome from "@/components/pages/home/AdminHome";
import { FirmHome } from "@/components/pages/home/FirmHome";
import { UserHome } from "@/components/pages/home/UserHome";
import { AssistantHome } from "@/components/pages/home/AssistantHome";
import { PaymentCard } from "@/components/PaymentCard";
import { Navbar } from "@/components/Navbar";
import Image from "next/image";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <>
      <Navbar />
      <div>
        {session?.user.isPaid || session?.user.role !== "INDIVIDUAL" ? (
          <div className="">
            <div className="text-xl">
              <Header>Home</Header>
            </div>
            <div className=" ml-56">
              <div className="">
                {session?.user.role === "ADMIN" && <AdminHome user={session?.user} />}
                {session?.user.role === "FIRM" && <FirmHome user={session?.user} />}
                {session?.user.role === "INDIVIDUAL" && <UserHome user={session?.user} />}
                {session?.user.role === "ASSISTANT" && <AssistantHome />}
              </div>
            </div>
          </div>
        ) : (
          <>
            <Image
              src="/images/home_bg.png"
              alt="Home BG"
              fill
              className="absolute grid h-full w-full place-items-center object-cover pl-52"
            />
            <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm">
              <PaymentCard />
            </div>
          </>
        )}
      </div>
    </>
  );
}
