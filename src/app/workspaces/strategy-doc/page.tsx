import React from "react";
import { getAuthSession } from "../../api/auth/[...nextauth]/authOptions";
import ClientStrategy from "@/components/pages/strategy-doc/ClientStrategy";
import FirmStrategy from "@/components/pages/strategy-doc/FirmStrategy";
import AssistantStrategy from "@/components/pages/strategy-doc/AssistantStrategy";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session?.user.role === "INDIVIDUAL" && <ClientStrategy userId={session.user.id} />}
      {session?.user.role === "FIRM" && <FirmStrategy />}
      {session?.user.role === "ASSISTANT" && <AssistantStrategy />}
    </div>
  );
};

export default page;
