import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";
import AdminHome from "@/components/pages/home/AdminHome";
import { FirmHome } from "@/components/pages/home/FirmHome";
import { UserHome } from "@/components/pages/home/UserHome";
import ClientFirmList from "@/components/pages/dashboard/client/ClientFirmList";

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
                  <AdminHome user={session.user.name} />
                </div>
              )}
              {session.user.role === "FIRM" && <FirmHome user={session.user.name} />}
              {session.user.role === "INDIVIDUAL" && <ClientFirmList />}
            </div>
          </div>
        </div>
      ) : (
        <div>
          <UserHome />
        </div>
      )}
    </div>
  );
}
