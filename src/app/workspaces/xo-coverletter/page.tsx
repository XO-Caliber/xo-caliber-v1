import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { PaymentCard } from "@/components/PaymentCard";
import AdminCoverLetter from "@/components/pages/cover-letter/admin/AdminCoverLetter";
import AssistantCoverLetter from "@/components/pages/cover-letter/assistant/AssistantCoverLetter";
import ClientCoverLetter from "@/components/pages/cover-letter/client/ClientCoverLetter";
import FirmCoverLetter from "@/components/pages/cover-letter/firm/FirmCoverLetter";
import React from "react";

const page = async () => {
  const session = await getAuthSession();

  return (
    <>
      <main className="">
        {session?.user.isActive || session?.user.role !== "INDIVIDUAL" ? (
          <div className="ml-56 h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
            {session?.user.role === "INDIVIDUAL" && <ClientCoverLetter user={session.user} />}
            {session?.user.role === "FIRM" && <FirmCoverLetter />}
            {session?.user.role === "ADMIN" && <AdminCoverLetter user={session.user} />}
            {session?.user.role === "ASSISTANT" && <AssistantCoverLetter />}
          </div>
        ) : (
          <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm bg-dotted-spacing-3 bg-dotted-gray-200">
            <PaymentCard />
          </div>
        )}
      </main>
    </>
  );
};

export default page;
