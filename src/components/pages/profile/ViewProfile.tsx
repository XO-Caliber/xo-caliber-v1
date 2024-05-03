"use client";
import { trpc } from "@/app/_trpc/client";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription
} from "@/components/ui/Dialog";
import {} from "@radix-ui/react-dialog";
import { User } from "lucide-react";
import React from "react";

const ViewProfile = ({ userId }: { userId?: string }) => {
  if (userId) {
    const userData = trpc.home.getUserProfile.useQuery(userId);
  }
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex items-center justify-center">
            <User size={18} className="bi bi-bookmark-fill" />
            <h1 className="ml-4 text-secondary-foreground hover:text-black">Profile</h1>
          </div>
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
