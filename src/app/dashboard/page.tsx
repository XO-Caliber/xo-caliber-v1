import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import React from "react";
const Dashboard = async () => {
  const session = await getAuthSession();
  return (
    <div className="text-xl">
      <Header>Dashboard</Header>
    </div>
  );
};

export default Dashboard;
