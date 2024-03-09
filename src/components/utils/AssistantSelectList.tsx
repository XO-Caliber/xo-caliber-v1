import React from "react";
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
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "./UserProfile";

interface AssistantProps {
  getSelectedAssistant?: (assistantData: string) => void;
}

const AssistantSelectList = ({ getSelectedAssistant }: AssistantProps) => {
  const assistantListResult = trpc.home.assistantList.useQuery();

  // Check if the result has data property
  const assistantList = assistantListResult?.data || [];

  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Select onValueChange={getSelectedAssistant}>
        <SelectTrigger className="overflow-hidden">
          <SelectValue placeholder="Change Assistant" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            {assistantList.map((user: any) => (
              <SelectItem key={user.id} value={user.email}>
                <UserProfile image={user.image} name={user.name} email={user.email} />
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AssistantSelectList;
