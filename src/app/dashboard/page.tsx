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
          <div className="m-4 ml-56">
            <div className="m-4 w-full font-bold">
              <h1 className="text-2xl font-semibold ">Welcome {session?.user?.name}</h1>
              <h2 className="text-sm font-normal ">All details of your clients</h2>
            </div>
            <div className="m-4">
              {session.user.role === "ADMIN" ? (
                <div>
                  <AdminDashboard />
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
