import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { CardTitle } from "@/components/ui/Card";
import Home from "@/app/page";
import React from "react";

const XOCaliberQA = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="ml-56 h-screen">
          <div>
            <Header className="ml-0">XO Caliber Q&A</Header>
          </div>
          <div className="absolute m-4 text-xl">
            <div className="font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header>XO Caliber Q&A</Header>
          <Home />
        </div>
      )}
    </div>
  );
};

export default XOCaliberQA;
