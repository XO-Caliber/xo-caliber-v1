import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import React from "react";
import { GetListQA } from "../q&a/GetListQA";
import AdminQA from "../q&a/admin/AdminQA";

const XOCaliberQA = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="h-screen">
          <div>
            <Header className="ml-0">XO Caliber Q&A</Header>
          </div>
          {session.user.role === "ADMIN" ? <AdminQA /> : <GetListQA />}
        </div>
      ) : (
        <div>
          <Header>XO Caliber Q&A</Header>
        </div>
      )}
    </div>
  );
};

export default XOCaliberQA;
