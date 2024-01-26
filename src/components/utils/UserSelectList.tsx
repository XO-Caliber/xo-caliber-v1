"use client";
import React, { useState } from "react";
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
import { getRandomImageUrl } from "./RandomProfileGenerator";

interface UserSelectListProps {
  users: { name: string; image: string }[] | undefined;
}

const UserSelectList = ({ users }: UserSelectListProps) => {
  const [selectedUser, setSelectedUser] = useState<{ name: string; image: string } | null>(null);

  const handleUserSelect = (user: { name: string; image: string }) => {
    setSelectedUser(user);
    console.log(user.name);
    console.log("In Select");
  };

  const randomImage = getRandomImageUrl();

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Avatar className="h-9 w-9">
        <AvatarImage src={selectedUser?.image || randomImage} alt="profile" />
      </Avatar>
      <Label className="text-base font-semibold">{selectedUser?.name}</Label>
      <Select>
        <SelectTrigger className="w-[116px]">
          <SelectValue placeholder="Change" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {users &&
              users.map((user, index) => (
                <SelectItem key={index} value={user.name} onClick={() => handleUserSelect(user)}>
                  {user.name}
                </SelectItem>
              ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectList;
