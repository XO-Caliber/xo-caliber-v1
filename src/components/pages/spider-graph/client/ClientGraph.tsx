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
import { Info } from "lucide-react";
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
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <div className="flex items-center justify-start">
          <p className="m-4 mr-1 mt-[1.2rem] font-bold text-heading">Assess</p>
          <span
            title="It's essential to assess profiles from diverse perspectives,
                          categorizing them into Research, Business, and Art. Each category demands
                          specific skills and evidence for validation. For example Artists can
                          showcase art shows, success stories, media mentions, and memberships. In
                          Business like IT industry, original contributions, critical roles, high
                          salary, and evaluating others' work matter, backed by scholarly
                          articles and memberships. Research profiles require original
                          contributions, critical roles, scholarly publications, and evaluating
                          others' work, not just media presence. The above examples are merely
                          examples; to win a case, you must meet at least three criteria. Consider a
                          spider graph to determine the strength of a profile and strengthen your
                          case by focusing on the key criteria in your field and gathering a variety
                          of strong evidence to support your claim. Winning some immigration visa
                          necessitates meeting four criteria effectively chosen for quality, not
                          quantity. Immigration authorities use a &quot;preponderance of
                          evidence&quot; standard, demanding just over 50% certainty, emphasizing
                          the importance of thorough evaluation. Despite misconceptions, evidence
                          evaluation involves more than counting, with immigration authorities
                          needing to justify refusals even when criteria are met. Understanding
                          these standards is crucial, and consulting an attorney can offer valuable
                          insights into the process."
          >
            <Info size={18} className="mt-1.5 cursor-pointer text-heading" />
          </span>
        </div>
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
