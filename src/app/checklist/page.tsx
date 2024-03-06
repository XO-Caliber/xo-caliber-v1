import React from "react";
import { getAuthSession } from "../api/auth/[...nextauth]/authOptions";
import AdminCheckList from "@/components/pages/checklist/admin/AdminCheckList";
import Header from "@/components/Header";
import FirmCheckList from "@/components/pages/checklist/firm/FirmCheckList";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session && session.user.role === "ADMIN" && <AdminCheckList />}{" "}
      {session && session.user.role === "FIRM" && <FirmCheckList />}
      {!session && (
        <div className="text-xl">
          <Header>CheckList</Header>
        </div>
      )}
    </div>
  );
};

export default page;
