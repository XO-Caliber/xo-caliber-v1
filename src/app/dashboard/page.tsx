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
    <div>
      {/* <UserDashboard userId={session?.user.id} /> */}
      {session && session.user.role === "INDIVIDUAL" && (
        <TimeLine userId={session?.user.id} userName={session?.user.name || ""} />
      )}
      {session && session.user.role === "ADMIN" && <AdminTimeLine />}
      {session && session.user.role === "FIRM" && <FirmTimeLine />}
      {session && session.user.role === "ASSISTANT" && <AssistantTimeLine />}
    </div>
  );
};

export default Dashboard;
