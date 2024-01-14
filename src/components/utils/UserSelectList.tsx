import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/Avatar";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { Label } from "../ui/Label";

const UserSelectList = () => {
  return (
    <div className="flex flex-row items-center justify-center gap-2 px-4">
      <Avatar className="h-9 w-9">
        <AvatarImage
          src="https://i.pinimg.com/1200x/75/d6/37/75d637661bf2d7f114be2376d75e7886.jpg"
          alt="profile"
        />
        {/* <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback> */}
      </Avatar>
      <Label className="text-base font-semibold">Luffy D Monkey</Label>
      <Select>
        <SelectTrigger className="w-[116px]">
          <SelectValue placeholder="Change" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default UserSelectList;
