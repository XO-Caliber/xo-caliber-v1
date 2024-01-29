import React from "react";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import { GetListQA } from "@/components/pages/q&a/GetListQA";
import FirmQA from "@/components/pages/q&a/firm/FirmQA";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="h-screen">
          <div>
            <Header className="ml-0">XO Caliber Q&A</Header>
          </div>
          {session.user.role === "ADMIN" || "FIRM" ? <FirmQA /> : <GetListQA />}
        </div>
      ) : (
        <div>
          <Header>XO Caliber Q&A</Header>
        </div>
      )}
    </div>
  );
};

export default page;
