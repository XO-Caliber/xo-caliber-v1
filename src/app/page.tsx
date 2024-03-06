import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";
import AdminHome from "@/components/pages/home/AdminHome";
import { FirmHome } from "@/components/pages/home/FirmHome";
import { UserHome } from "@/components/pages/home/UserHome";
import ClientFirmList from "@/components/pages/home/client/ClientFirmList";
import { AssistantHome } from "@/components/pages/home/AssistantHome";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="">
          <div className="text-xl">
            <Header>Home</Header>
          </div>
          <div className=" ml-56">
            <div className="">
              {session.user.role === "ADMIN" && (
                <div>
                  <AdminHome user={session.user} />
                </div>
              )}
              {session.user.role === "FIRM" && <FirmHome user={session.user} />}
              {session.user.role === "INDIVIDUAL" && <UserHome user={session.user} />}
              {session.user.role === "ASSISTANT" && <AssistantHome />}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-lg font-bold">
          <Header>Home</Header>
        </div>
      )}
    </div>
  );
}
