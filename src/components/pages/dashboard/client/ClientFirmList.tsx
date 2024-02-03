"use client";
import { trpc } from "@/app/_trpc/client";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { UserProfile } from "@/components/utils/UserProfile";
import React from "react";
import LeaveFirmForm from "./LeaveFirmForm";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";

const ClientFirmList = () => {
  const clientFirmList = trpc.getClientFirm.useQuery();
  if (clientFirmList.data?.Firm) {
    return (
      <div>
        <Card className="m-8  h-[300px] w-[250px] p-2">
          <CardHeader className="text-xl font-bold">Your Firm</CardHeader>
          <CardContent>
            <UserProfile
              email={clientFirmList.data.Firm?.email}
              name={clientFirmList.data.Firm?.name}
            />
            <div className="flex pl-12 pt-24">
              <LeaveFirmForm />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  } else {
    return (
      <div className="m-8 flex ">
        <Card className="h-[300px] w-[250px] p-2">
          <CardHeader className="text-xl font-bold">Your Firm</CardHeader>
          <UserProfileLoading />
        </Card>
      </div>
    );
  }
};

export default ClientFirmList;
