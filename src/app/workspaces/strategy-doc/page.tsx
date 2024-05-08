import React from "react";
import { getAuthSession } from "../../api/auth/[...nextauth]/authOptions";
import ClientStrategy from "@/components/pages/strategy-doc/ClientStrategy";

import StrategyDoc from "@/components/pages/strategy-doc/StrategyDoc";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div className="h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
      {session?.user.role === "INDIVIDUAL" && <ClientStrategy userId={session.user.id} />}
      {session?.user.role === "FIRM" && <StrategyDoc role="FIRM" />}
      {session?.user.role === "ASSISTANT" && <StrategyDoc role="ASSISTANT" />}
    </div>
  );
};

export default page;
