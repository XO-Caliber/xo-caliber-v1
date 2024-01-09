import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import Header from "@/components/Header";
import { AddFirmForm } from "@/components/pages/admin/AddFirmForm";
import { AddAssistantForm } from "@/components/pages/firm/AddAssistantForm";
import { AssistantList } from "@/components/pages/firm/AssistantList";
import { CardTitle } from "@/components/ui/Card";
import React from "react";

const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="ml-56 h-screen">
          <div>
            <Header className="ml-0">Dashboard</Header>
          </div>
          <div className="m-4">
            <div className="w-full font-bold">
              <CardTitle>Welcome {session?.user?.name?.toLowerCase()}</CardTitle>
            </div>
            <div className="m-4 w-[350px]">
              {session.user.role === "ADMIN" ? (
                <div>
                  <AddFirmForm />
                </div>
              ) : (
                <></>
              )}
              {session.user.role === "FIRM" ? (
                <div className="flex w-full items-center justify-center">
                  <AddAssistantForm />

                  <AssistantList />
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
