"use client";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from "@/components/ui/Dialog";
import {} from "@radix-ui/react-dialog";
import React from "react";

const ViewProfile = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <p>View Profile</p>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>Your Profile</DialogTitle>
          <DialogDescription>Yes yes</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewProfile;
