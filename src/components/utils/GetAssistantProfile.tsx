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
import { trpc } from "@/app/_trpc/client";
import { GetUserProfile } from "./GetUserProfile";

interface UserProfile {
  name: string | null | undefined;
  email: string;
  image?: string | null | undefined;
}

export const GetAssistantProfile = ({ name, email, image }: UserProfile) => {
  const userList = trpc.home.getAssistantsUser.useQuery(email);
  console.log(userList.data);

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
      <DialogContent className="min-w-[500px]">
        <DialogHeader>
          <DialogTitle>Assistant Profile</DialogTitle>
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
        <div className="  grid-rows grid w-[60%]   gap-y-5 ">
          <ul className="scrollableContainer min-h-[200px] overflow-y-scroll rounded-md border-2 p-3">
            <li className="space-y-1  text-lg font-bold">
              Assigned clients: {userList.data?.length}
            </li>
            <li>
              {userList.data?.map((user, index) => (
                <div key={index} className="mb-2 rounded-md bg-secondary">
                  <GetUserProfile email={user.email} name={user.name} image={user.image} />
                </div>
              ))}
            </li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  );
};
