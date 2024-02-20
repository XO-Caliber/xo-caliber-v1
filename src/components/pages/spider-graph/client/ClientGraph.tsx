"use client";
import React, { useState } from "react";
import XOSpiderGraph from "@/components/pages/spider-graph/XOSpiderGraph";
import AdminSpiderGraph from "@/components/pages/workspaces/client/AdminSpiderGraph";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
interface userProps {
  user: string;
}
const ClientGraph = ({ user }: userProps) => {
  const [userType, setUserType] = useState("admin");

  const handleChange = (userType: string) => {
    setUserType(userType);
  };

  console.log(userType);

  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">XO Caliber Spider graph</p>
        <span className="mr-10 w-32">
          <Select onValueChange={handleChange}>
            <SelectTrigger className="bg-black text-white">
              <SelectValue placeholder="Admin" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="firm">Firm</SelectItem>
            </SelectContent>
          </Select>
        </span>
      </div>
      {userType === "admin" ? <AdminSpiderGraph /> : <XOSpiderGraph userType={user} />}
    </div>
  );
};

export default ClientGraph;
