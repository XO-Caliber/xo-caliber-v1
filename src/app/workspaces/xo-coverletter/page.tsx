import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
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
        <Header>Craft</Header>
        <div className="ml-56">
          {session && session?.user.role === "INDIVIDUAL" && (
            <ClientCoverLetter user={session.user} />
          )}
          {session && session?.user.role === "FIRM" && <FirmCoverLetter />}
          {session && session.user.role === "ADMIN" && <AdminCoverLetter user={session.user} />}
          {session && session.user.role === "ASSISTANT" && <AssistantCoverLetter />}
        </div>
      </main>
      {!session && <main>Login to get access</main>}
    </>
  );
};

export default page;
