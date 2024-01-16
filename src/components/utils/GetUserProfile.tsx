import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "../ui/Dialog";

interface userProfile {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | undefined | null;
}

export const GetUserProfile = ({ name, email, image }: userProfile) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center  rounded-md p-2 text-black hover:bg-secondary">
          <Avatar className="left h-9 w-9">
            <AvatarImage src={image || ""} alt="profile" />
            <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback>
          </Avatar>
          <ul className="overflow-hidden text-ellipsis pl-4">
            <li className="text-sm font-medium">{name}</li>
            <li className="text-sm text-muted">{email}</li>
          </ul>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Profile</DialogTitle>
          <DialogDescription>All the details of users</DialogDescription>
        </DialogHeader>
        <div className="flex cursor-pointer items-center  rounded-md bg-secondary p-2 text-black">
          <Avatar className="left h-9 w-9">
            <AvatarImage src={image || ""} alt="profile" />
            <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback>
          </Avatar>
          <ul className="overflow-hidden text-ellipsis pl-4">
            <li className="text-sm font-medium">{name}</li>
            <li className="text-sm text-muted">{email}</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
