import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

interface userProfile {
  name: string | null | undefined;
  email: string | null | undefined;
  image?: string | undefined | null;
}

export const UserProfile = ({ name, email, image }: userProfile) => {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 text-black hover:bg-secondary">
      <Avatar className="h-9 w-9">
        <AvatarImage src={image} alt="profile" />
        <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback>
      </Avatar>
      <ul className="overflow-hidden text-ellipsis pl-4">
        <li className="text-sm font-medium">{name}</li>
        <li className="text-sm text-muted">{email}</li>
      </ul>
    </div>
  );
};
