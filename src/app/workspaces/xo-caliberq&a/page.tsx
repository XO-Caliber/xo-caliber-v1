import React from "react";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import Header from "@/components/Header";
import ClientQA from "@/components/pages/q&a/client/ClientQA";
import FirmQA from "@/components/pages/q&a/firm/FirmQA";
import AdminQA from "@/components/pages/q&a/admin/AdminQA";
import AssistantQA from "@/components/pages/q&a/assistant/AssistantQA";

export default async function page() {
  const session = await getAuthSession();
  return (
    <div>
      {session ? (
        <div className="h-screen bg-dotted-spacing-3 bg-dotted-gray-200">
          {session.user.role === "FIRM" && <FirmQA />}
          {session.user.role === "ADMIN" && <AdminQA />}
          {session.user.role === "INDIVIDUAL" && (
            <ClientQA
              userId={session.user.id}
              name={session.user.name}
              email={session.user.email}
              image={session.user.image}
            />
          )}
          {session.user.role === "ASSISTANT" && <AssistantQA />}
        </div>
      ) : (
        <div className="text-xl font-bold">
          <Header> Caliber Q&A</Header>
        </div>
      )}
    </div>
  );
}
