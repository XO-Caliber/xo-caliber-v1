import Header from "@/components/Header";
import { PaymentCard } from "@/components/PaymentCard";
import AdminHome from "@/components/pages/home/AdminHome";
import { AssistantHome } from "@/components/pages/home/AssistantHome";
import { FirmHome } from "@/components/pages/home/FirmHome";
import Image from "next/image";
import React from "react";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";
import { UserHome } from "@/components/pages/home/UserHome";
import { Navbar } from "@/components/Navbar";

const page = async () => {
  const session = await getAuthSession();
  return (
    <>
      <div>
        <Navbar />
        {session?.user.isActive || session?.user.role !== "INDIVIDUAL" ? (
          <div className="">
            <div className="text-xl">
              <Header>Home</Header>
            </div>
            <div className=" ml-56">
              <div className="">
                {session?.user.role === "ADMIN" && <AdminHome user={session?.user} />}
                {session?.user.role === "FIRM" && <FirmHome user={session?.user} />}
                {session?.user.role === "INDIVIDUAL" && <UserHome user={session?.user} />}
                {session?.user.role === "ASSISTANT" && <AssistantHome user={session.user} />}
              </div>
            </div>
          </div>
        ) : (
          <>
            <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm bg-dotted-spacing-3 bg-dotted-gray-200">
              <PaymentCard />
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default page;
