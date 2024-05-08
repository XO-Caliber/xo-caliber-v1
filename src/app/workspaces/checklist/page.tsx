import React from "react";
import { getAuthSession } from "../../api/auth/[...nextauth]/authOptions";
import AdminCheckList from "@/components/pages/checklist/admin/AdminCheckList";
import Header from "@/components/Header";
import FirmCheckList from "@/components/pages/checklist/firm/FirmCheckList";
import Checklist from "@/components/pages/checklist/Checklist";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
      {session && session.user.role === "ADMIN" && <AdminCheckList />}
      {session && session.user.role === "FIRM" && <FirmCheckList />}
      {session && session.user.role === "INDIVIDUAL" && <Checklist userId={session.user.id} />}
      {!session && (
        <div className="text-xl">
          <Header>CheckList</Header>
        </div>
      )}
    </div>
  );
};

export default page;
