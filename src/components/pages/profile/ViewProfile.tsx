"use client";
import { trpc } from "@/app/_trpc/client";
import PaymentCancel from "@/components/payment/PaymentCancel";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogTitle,
  DialogTrigger,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter
} from "@/components/ui/Dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/Dropdown-menu";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/use-toast";
import { user } from "@/types/user";
import {} from "@radix-ui/react-dialog";
import { MoreHorizontal, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const ViewProfile = ({ userId }: { userId?: string }) => {
  const userData = trpc.home.getUserProfile.useQuery();
  const [userName, setUserName] = useState(userData.data?.name);
  const email = userData.data?.email;
  useEffect(() => {
    setUserName(userData.data?.name);
  }, [userData]);

  const [buttonDisabled, setButtonDisabled] = useState(true);
  const [nameDisabled, setNameDisabled] = useState(true);
  const userType = userData.data?.role;
  console.log(userName, email);
  const { mutate: updateProfile } = trpc.home.updateUserProfile.useMutation({
    onSuccess({ success }) {
      if (success) {
        userData.refetch();
        toast({
          title: "Profile Updated",
          description: "Relogin to view the latest changes "
        });
      }
    }
  });
  const handleSubmit = () => {
    if (userName?.trim()) {
      try {
        updateProfile(userName || "");
      } catch (err) {
        console.log(err);
      }
    } else {
      toast({
        title: "Please enter a valid name",
        variant: "destructive"
      });
    }
  };

  const handleChange = () => {
    setButtonDisabled(false);
  };

  return (
    <div>
      <DialogContent className="item-center flex  flex-col justify-start">
        <DialogHeader className="w-[700px] border border-x-0 border-t-0 border-black p-2">
          <DialogTitle className="text-xl">Your Profile</DialogTitle>
        </DialogHeader>
        <section>
          <ul>
            <li>
              <p className=" font-bold text-black">Name</p>
              <div className="flex items-center justify-between gap-x-2">
                <Input
                  className="text-black "
                  value={userName || ""}
                  onChange={(e) => {
                    setUserName(e.target.value);
                    handleChange();
                  }}
                  disabled={nameDisabled}
                />
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <MoreHorizontal className="cursor-pointer" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onClick={() => setNameDisabled(false)}>Edit</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </li>
            <li>
              <p className="flex items-center justify-start font-bold text-black">Email</p>
              <Input className="text-black " value={email || ""} disabled={true} />
            </li>
            <li>
              <p className="flex items-center justify-start font-bold text-black">Role</p>
              <Input className="text-black " value={userType || ""} disabled={true} />
            </li>
            <li>
              {" "}
              <Link className="mr-2 text-[#63156A]" href={"/reset-password"}>
                Reset password
              </Link>
            </li>
          </ul>
        </section>
        <DialogFooter>
          <Button disabled={buttonDisabled} variant={"dark"} onClick={handleSubmit}>
            Save
          </Button>
          <PaymentCancel />
        </DialogFooter>
      </DialogContent>
    </div>
  );
};

export default ViewProfile;
