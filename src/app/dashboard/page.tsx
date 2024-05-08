import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { AdminTimeLine } from "@/components/pages/dashboard/AdminTimeLine";
import { AssistantTimeLine } from "@/components/pages/dashboard/AssistantTImeLine";
import { FirmTimeLine } from "@/components/pages/dashboard/FirmTimeLine";
import { TimeLine } from "@/components/pages/dashboard/TimeLine";
import UserDashboard from "@/components/pages/dashboard/UserDashboard";
import React from "react";
const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-[100vh] bg-dotted-spacing-3 bg-dotted-gray-200">
      {/* <UserDashboard userId={session?.user.id} /> */}
      {session?.user.role === "INDIVIDUAL" ? (
        <TimeLine userId={session?.user.id} userName={session?.user.name || ""} />
      ) : (
        <AdminTimeLine role={session?.user.role} />
      )}
    </div>
  );
};

export default Dashboard;
