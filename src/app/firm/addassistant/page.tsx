import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { AddAssistantForm } from "@/components/pages/firm/AddAssistantForm";
import { notFound } from "next/navigation";
import React from "react";

const page = async () => {
  const session = await getAuthSession();
  // Check if the user is admin
  if (session && session.user && session.user.role === "FIRM") {
    return (
      <div className="ml-56 h-screen">
        <div className="h-[64px] border-2 border-l-0">
          <p className="m-4 text-muted">Add Assistant</p>
        </div>
        <div className="m-4 text-xl">
          <div className="font-extrabold">Your are an firm</div>
        </div>
        <div className="flex items-center justify-center">
          <AddAssistantForm />
        </div>
      </div>
    );
  } else {
    notFound();
    // Render something else or redirect to a different page
  }
};

export default page;
