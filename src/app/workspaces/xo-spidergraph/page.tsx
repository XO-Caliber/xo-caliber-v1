import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import ClientGraph from "@/components/pages/spider-graph/client/ClientGraph";
import FirmGraph from "@/components/pages/spider-graph/firm/FirmGraph";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <div>
      {session && session?.user.role === "INDIVIDUAL" && <ClientGraph user="INDIVIDUAL" />}
      {session && session?.user.role === "FIRM" && (
        <div className="relative left-[500px] top-[100px]">
          <FirmGraph userType="FIRM" />
        </div>
      )}
    </div>
  );
};

export default Page;
