import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";

export const UserProfileLoading = () => {
  return (
    <div className="flex cursor-pointer items-center justify-between rounded-md p-2 text-black hover:bg-secondary">
      <Avatar className="h-9 w-9">
        {/* <AvatarImage src= alt="profile" /> */}
        <div className="aspect-square h-full w-full bg-muted"></div>
      </Avatar>
      <ul className="overflow-hidden text-ellipsis pl-4">
        <li className="m-2 h-3 w-20 rounded-sm bg-muted"></li>
        <li className="h-3 w-24 rounded-sm bg-muted"></li>
      </ul>
    </div>
  );
};
