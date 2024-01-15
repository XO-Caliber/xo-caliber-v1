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
