import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import Header from "@/components/Header";
import { CardTitle } from "@/components/ui/Card";
import React from "react";

const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="ml-56 h-screen">
          <div className="h-[65px] border-2 border-l-0">
            <p className="m-4 text-muted">Dashboard</p>
          </div>
          <div className="absolute m-4 text-xl">
            <div className="font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Header>Dashboard</Header>
          <Home />
        </div>
      )}
    </div>
  );
};

export default Dashboard;