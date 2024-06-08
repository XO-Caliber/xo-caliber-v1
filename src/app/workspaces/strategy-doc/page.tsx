import React from "react";
import { getAuthSession } from "../../api/auth/[...nextauth]/authOptions";
import StrategyDoc from "@/components/pages/strategy-doc/StrategyDoc";
import { PaymentCard } from "@/components/PaymentCard";

const page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session?.user.isActive || session?.user.role !== "INDIVIDUAL" ? (
        <div className="h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
          {session?.user.role === "FIRM" && <StrategyDoc role="FIRM" />}
          {session?.user.role === "ASSISTANT" && <StrategyDoc role="ASSISTANT" />}
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
