import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { CardTitle } from "@/components/ui/Card";
import Home from "@/app/page";
import React from "react";

const XOCoverLetter = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className=" h-screen">
          <div>
            <Header>XO Cover Letter</Header>
          </div>
          <div className="absolute m-4  text-xl">
            <div className="ml-56 font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header>XO Cover Letter</Header>
        </div>
      )}
    </div>
  );
};
export default XOCoverLetter;
