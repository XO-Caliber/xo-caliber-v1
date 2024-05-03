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
import { trpc } from "@/app/_trpc/client";
interface userProps {
  user: string;
}
const ClientGraph = ({ user }: userProps) => {
  const { data: hasFirm } = trpc.home.checkHasFirm.useQuery();
  // const [userType, setUserType] = useState("firm");

  // const handleChange = (userType: string) => {
  //   setUserType(userType);
  // };

  // console.log(userType);

  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-heading">Assess</p>
        <span className="mr-10 w-32">
          {/* <Select onValueChange={handleChange}>
            <SelectTrigger className="bg-black text-white">
              <SelectValue placeholder="Firm" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="firm">Firm</SelectItem>
              <SelectItem value="default">Default</SelectItem>
            </SelectContent>
          </Select> */}
        </span>
      </div>
      {hasFirm === false ? <AdminSpiderGraph /> : <XOSpiderGraph userType={user} />}
    </div>
  );
};

export default ClientGraph;
