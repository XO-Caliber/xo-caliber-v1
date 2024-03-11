import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import AdminCoverLetter from "@/components/pages/cover-letter/admin/AdminCoverLetter";
import ClientCoverLetter from "@/components/pages/cover-letter/client/ClientCoverLetter";
import FirmCoverLetter from "@/components/pages/cover-letter/firm/FirmCoverLetter";
import React from "react";

const page = async () => {
  const session = await getAuthSession();

  return (
    <>
      <main className="">
        <Header>Cover Letter</Header>
        <div className="ml-56">
          {session && session?.user.role === "INDIVIDUAL" && <ClientCoverLetter />}
          {session && session?.user.role === "FIRM" && <FirmCoverLetter name={session.user.name} />}
          {session && session.user.role === "ADMIN" && <AdminCoverLetter />}
        </div>
      </main>
      {!session && <main>Login to get access</main>}
    </>
  );
};

export default page;
