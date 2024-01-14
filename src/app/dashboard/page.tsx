import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import AdminDashboard from "@/components/pages/dashboard/AdminDashboard";
import { FirmDashboard } from "@/components/pages/dashboard/FirmDashboard";
import { UserDashboard } from "@/components/pages/dashboard/UserDashboard";
import LeaveFirmForm from "@/components/pages/dashboard/client/LeaveFirmForm";
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
              {session.user.role === "FIRM" ? <FirmDashboard user={session.user.name} /> : <></>}
              {session.user.role === "INDIVIDUAL" ? <LeaveFirmForm /> : <></>}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <UserDashboard />
        </div>
      )}
    </div>
  );
};

export default Dashboard;
