"use client";
import { trpc } from "@/app/_trpc/client";
import React from "react";
import ViewAdminCheckList from "./client/ViewAdminCheckList";
import ViewFirmCheckList from "./client/ViewFirmCheckList";

interface UserProps {
  userId: string;
}
const Checklist = ({ userId }: UserProps) => {
  const { data: hasFirm } = trpc.checklist.getUserHasFirm.useQuery(userId);
  return (
    <div>
      {hasFirm?.firmId ? (
        <ViewFirmCheckList userId={userId} />
      ) : (
        <ViewAdminCheckList userId={userId} />
      )}
    </div>
  );
};

export default Checklist;
