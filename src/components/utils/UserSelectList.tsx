<<<<<<< HEAD
"use client";
import React, { useState } from "react";
=======
import React from "react";
>>>>>>> 7f82e2f (feat: Added assistant assigning logic in q&a)
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { Label } from "../ui/Label";
<<<<<<< HEAD
import { getRandomImageUrl } from "./RandomProfileGenerator";

interface UserSelectListProps {
  users: { name: string; avatar: string }[] | undefined;
}

const UserSelectList = ({ users }: UserSelectListProps) => {
  const [selectedUser, setSelectedUser] = useState<{ name: string; avatar: string } | null>(null);

  const handleUserSelect = (user: { name: string; image: string }) => {
    setSelectedUser(user);
  };

  const randomImage = getRandomImageUrl();

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src={randomImage} alt="profile" />
      </Avatar>
      <Label className="text-base font-semibold">{selectedUser?.name || "Select a user"}</Label>
      <Select>
        <SelectTrigger className="w-[116px]">
=======
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "./UserProfile";

interface UserProps {
  getSelectedUser?: (userData: string) => void;
}

const UserSelectList = ({ getSelectedUser }: UserProps) => {
  const clientListResult = trpc.clientList.useQuery();

  const clientList = clientListResult?.data || [];

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Select onValueChange={getSelectedUser}>
        <SelectTrigger className="flex h-16 w-[226px] flex-row overflow-hidden">
>>>>>>> 7f82e2f (feat: Added assistant assigning logic in q&a)
          <SelectValue placeholder="Change" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
<<<<<<< HEAD
            {users &&
              users.map((user, index) => (
                <SelectItem key={index} value={user.name} onClick={() => handleUserSelect(user)}>
                  {user.name}
                </SelectItem>
              ))}
=======
            {clientList.map((user) => (
              <SelectItem key={user.id} value={user.email}>
                <UserProfile image={user.image} name={user.name} email={user.email}></UserProfile>
              </SelectItem>
            ))}
>>>>>>> 7f82e2f (feat: Added assistant assigning logic in q&a)
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectList;
