import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import AdminGraph from "@/components/pages/spider-graph/admin/AdminGraph";
import AssistantGraph from "@/components/pages/spider-graph/assistant/AssistantGraph";
import ClientGraph from "@/components/pages/spider-graph/client/ClientGraph";
import FirmGraph from "@/components/pages/spider-graph/firm/FirmGraph";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <>
      <div className="ml-56">
        {session && session?.user.role === "INDIVIDUAL" && <ClientGraph user="INDIVIDUAL" />}
        {session && session?.user.role === "FIRM" && <FirmGraph userType="FIRM" />}
        {session && session.user.role === "ADMIN" && <AdminGraph userType="ADMIN" />}
        {session && session.user.role === "ASSISTANT" && <AssistantGraph userType={"ASSISTANT"} />}
      </div>
      {!session && (
        <div className="text-xl font-bold">
          <Header>Spider Graph</Header>
        </div>
      )}
    </>
  );
};

export default Page;
