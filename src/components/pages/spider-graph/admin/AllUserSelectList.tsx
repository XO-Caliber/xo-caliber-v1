import React from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "@/components/utils/UserProfile";

interface UserProps {
  getSelectedUser?: (userData: string) => void;
}

const AllUserSelectList = ({ getSelectedUser }: UserProps) => {
  const clientListResult = trpc.home.getAllUserList.useQuery();

  const clientList = clientListResult?.data || [];

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Select onValueChange={getSelectedUser}>
        <SelectTrigger className="flex flex-row overflow-hidden">
          <SelectValue placeholder="Change User" />
        </SelectTrigger>
        <SelectContent>
          {clientList.map((user) => (
            <SelectItem key={user.id} value={user.id}>
              <UserProfile image={user.image} name={user.name} email={user.email} />
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default AllUserSelectList;
