import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { CardTitle } from "@/components/ui/Card";
import { Home } from "lucide-react";
import React from "react";

const XOCoverLetter = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="ml-56 h-screen">
          <div className="h-[65px] border-2 border-l-0">
            <p className="m-4 text-muted">XO Cover Letter</p>
          </div>
          <div className="absolute m-4 text-xl">
            <div className="font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header>XO Cover Letter</Header>
          <Home />
        </div>
      )}
    </div>
  );
};
export default XOCoverLetter;
