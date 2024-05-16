import React from "react";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import { CardTitle } from "@/components/ui/Card";
import Header from "@/components/Header";
import { PaymentCard } from "@/components/PaymentCard";

const XOMindMap = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session && session.user.isActive ? (
        <div className="h-screen">
          <div className="text-xl font-bold">
            <Header>Mindmap</Header>
          </div>
          <div className="absolute m-4 text-xl ">
            <div className="ml-56 font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm bg-dotted-spacing-3 bg-dotted-gray-200">
          <PaymentCard />
        </div>
      )}
    </div>
  );
};

export default XOMindMap;
