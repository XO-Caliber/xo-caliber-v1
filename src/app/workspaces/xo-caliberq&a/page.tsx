import React from "react";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import ClientQA from "@/components/pages/q&a/client/ClientQA";
import FirmQA from "@/components/pages/q&a/firm/FirmQA";
import AdminQA from "@/components/pages/q&a/admin/AdminQA";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="h-screen">
          <div>
            <Header className="ml-0">XO Caliber Q&A</Header>
          </div>
          {session.user.role === "FIRM" && <FirmQA />}
          {session.user.role === "ADMIN" && <AdminQA />}
          {session.user.role === "INDIVIDUAL" && (
            <ClientQA
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
          )}
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
