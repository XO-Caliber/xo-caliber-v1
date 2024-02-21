"use client";

import { DropdownMenuItem } from "@/components/ui/Dropdown-menu";
import { signOut } from "next-auth/react";

export default function Logout() {
  return (
    <DropdownMenuItem
      className="cursor-pointer"
      onClick={() => {
        signOut({ redirect: false });
      }}
    >
      <span>Log Out</span>
    </DropdownMenuItem>
  );
}
