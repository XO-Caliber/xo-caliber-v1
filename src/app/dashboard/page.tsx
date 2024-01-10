import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Home from "@/app/page";
import Header from "@/components/Header";
import AdminDashboard from "@/components/pages/admin/AdminDashboard";
import { AddAssistantForm } from "@/components/pages/firm/AddAssistantForm";
import { AddClientForm } from "@/components/pages/firm/AddClientForm";
import React from "react";

const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="">
          <div>
            <Header className="ml-0">Dashboard</Header>
          </div>
          <div className=" ml-56">
            <div className="">
              {session.user.role === "ADMIN" ? (
                <div>
                  <AdminDashboard user={session.user.name} />
                </div>
              ) : (
                <></>
              )}
              {session.user.role === "FIRM" ? (
                <div className="flex w-full items-center justify-center">
                  <AddAssistantForm />
                  <AddClientForm />
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
