"use client";
import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "./UserProfile";

interface UserProps {
  getSelectedUser?: (userData: string) => void;
}

const UserSelectList = ({ getSelectedUser }: UserProps) => {
  const clientListResult = trpc.home.clientList.useQuery();

  const clientList = clientListResult?.data || [];

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Select onValueChange={getSelectedUser}>
        <SelectTrigger className="flex flex-row overflow-hidden">
          <SelectValue placeholder="Change User" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectGroup> */}
          {clientList.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <UserProfile image={user.image} name={user.name} email={user.email}></UserProfile>
            </SelectItem>
          ))}
          {/* </SelectGroup> */}
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectList;
