import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import AdminCoverLetter from "@/components/pages/cover-letter/admin/AdminCoverLetter";
import ClientCoverLetter from "@/components/pages/cover-letter/client/ClientCoverLetter";
import FirmCoverLetter from "@/components/pages/cover-letter/firm/FirmCoverLetter";

const Page = async () => {
  const session = await getAuthSession();
  return (
    <>
      <div className="ml-56">
        {session && session?.user.role === "INDIVIDUAL" && <ClientCoverLetter />}
        {session && session?.user.role === "FIRM" && <FirmCoverLetter />}
        {session && session.user.role === "ADMIN" && <AdminCoverLetter />}
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
