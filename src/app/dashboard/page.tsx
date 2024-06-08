import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { AdminTimeLine } from "@/components/pages/dashboard/AdminTimeLine";
import { TimeLine } from "@/components/pages/dashboard/TimeLine";

import React from "react";
const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-[100vh] bg-dotted-spacing-3 bg-dotted-gray-200">
      {!session && <Header>Timeline</Header>}
      {session &&
        (session?.user.role === "INDIVIDUAL" ? (
          <TimeLine userId={session?.user.id} userName={session?.user.name || ""} />
        ) : (
          <AdminTimeLine role={session?.user.role} />
        ))}
    </div>
  );
};

export default Dashboard;
