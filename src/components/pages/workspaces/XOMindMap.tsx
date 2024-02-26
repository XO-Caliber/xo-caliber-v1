import React from "react";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import { CardTitle } from "@/components/ui/Card";
import Header from "@/components/Header";

const XOMindMap = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="h-screen">
          <div>
            <Header>Mindmap</Header>
          </div>
          <div className="absolute m-4 text-xl ">
            <div className="ml-56 font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header>Mind Map</Header>
        </div>
      )}
    </div>
  );
};

export default XOMindMap;
