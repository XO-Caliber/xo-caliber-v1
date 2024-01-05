import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import React from "react";

const AddFirm = async () => {
  const session = await getAuthSession();

  // Check if the user is admin
  if (session && session.user && session.user.role === "ADMIN") {
    return <div>AddFirm</div>;
  } else {
    // Render something else or redirect to a different page
    return <div>You do not have permission to access this page.</div>;
  }
};

export default AddFirm;
