import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { PaymentCard } from "@/components/PaymentCard";
import AdminGraph from "@/components/pages/spider-graph/admin/AdminGraph";
import AssistantGraph from "@/components/pages/spider-graph/assistant/AssistantGraph";
import ClientGraph from "@/components/pages/spider-graph/client/ClientGraph";
import FirmGraph from "@/components/pages/spider-graph/firm/FirmGraph";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <>
      {session?.user.isActive || session?.user.role !== "INDIVIDUAL" ? (
        <div className="ml-56 bg-dotted-spacing-3 bg-dotted-gray-200">
          {session?.user.role === "INDIVIDUAL" && <ClientGraph user="INDIVIDUAL" />}
          {session?.user.role === "FIRM" && <FirmGraph userType="FIRM" />}
          {session?.user.role === "ADMIN" && <AdminGraph userType="ADMIN" />}
          {session?.user.role === "ASSISTANT" && <AssistantGraph userType={"ASSISTANT"} />}
        </div>
      ) : (
        <div className="absolute grid h-full w-full place-items-center backdrop-blur-sm bg-dotted-spacing-3 bg-dotted-gray-200">
          <PaymentCard />
        </div>
      )}
    </>
  );
};

export default Page;
