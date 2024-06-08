import React from "react";
import { getAuthSession } from "../../api/auth/[...nextauth]/authOptions";
import AdminCheckList from "@/components/pages/checklist/admin/AdminCheckList";
import FirmCheckList from "@/components/pages/checklist/firm/FirmCheckList";
import Checklist from "@/components/pages/checklist/Checklist";
import { PaymentCard } from "@/components/PaymentCard";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session?.user.isActive || session?.user.role !== "INDIVIDUAL" ? (
        <div className="h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
          {session?.user.role === "ADMIN" && <AdminCheckList />}
          {session?.user.role === "FIRM" && <FirmCheckList />}
          {session?.user.role === "INDIVIDUAL" && <Checklist userId={session.user.id} />}
        </div>
      ) : (
        <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm bg-dotted-spacing-3 bg-dotted-gray-200">
          <PaymentCard />
        </div>
      )}
    </div>
  );
};

export default page;
