import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import Header from "@/components/Header";
import { CardTitle } from "@/components/ui/Card";
import React from "react";
import { AddFirmForm } from "../admin/AddFirmForm";
import { AddAssistantForm } from "../firm/AddAssistantForm";

const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="ml-56 h-screen">
          <div>
            <Header className="ml-0">Dashboard</Header>
          </div>
          <div className="absolute m-4 grid grid-cols-2 text-xl">
            <div className="w-[800px] font-extrabold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
            <div className="ml- w-[350px]">
              {session.user.role === "ADMIN" ? (
                <div>
                  <AddFirmForm />
                </div>
              ) : (
                <></>
              )}
              {session.user.role === "FIRM" ? (
                <div className="">
                  <AddAssistantForm />
                </div>
              ) : (
                <></>
              )}
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
