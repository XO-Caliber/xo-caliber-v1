"use client";
import React, { useState } from "react";
import SpiderGraph from "@/components/pages/spider-graph/XOSpiderGraph";
import AdminSpiderGraph from "@/components/pages/workspaces/client/AdminSpiderGraph";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";

const Page = () => {
  const [userType, setUserType] = useState("admin");

  const handleChange = (userType: string) => {
    setUserType(userType);
  };

  console.log(userType);

  return (
    <div>
      <div className="relative left-[500px] top-[100px] w-[200px]">
        <Select onValueChange={handleChange}>
          <SelectTrigger className="bg-black text-white">
            <SelectValue placeholder="Admin" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="firm">Firm</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="relative left-[500px] top-[100px]">
        {userType === "admin" ? <AdminSpiderGraph /> : <SpiderGraph />}
      </div>
    </div>
  );
};

export default Page;
