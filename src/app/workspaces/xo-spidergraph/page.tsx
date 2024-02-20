import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import AdminGraph from "@/components/pages/spider-graph/admin/AdminGraph";
import ClientGraph from "@/components/pages/spider-graph/client/ClientGraph";
import FirmGraph from "@/components/pages/spider-graph/firm/FirmGraph";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <div className="ml-56">
      {session && session?.user.role === "INDIVIDUAL" && <ClientGraph user="INDIVIDUAL" />}
      {session && session?.user.role === "FIRM" && <FirmGraph userType="FIRM" />}
      {session && session.user.role === "ADMIN" && <AdminGraph userType="ADMIN" />}
    </div>
  );
};

export default Page;
