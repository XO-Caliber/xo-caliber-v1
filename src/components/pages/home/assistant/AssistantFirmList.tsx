"use client";
import { trpc } from "@/app/_trpc/client";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { UserProfile } from "@/components/utils/UserProfile";
import React from "react";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetUserProfile } from "@/components/utils/GetUserProfile";
import LeaveAssistantFirm from "./LeaveAssistantFIrm";

interface userProps {
  user: string;
}
const AssistantFirmList = ({ user }: userProps) => {
  const assistantFirmList = trpc.home.getAssistantsFirm.useQuery(user);
  const refetchData = () => {
    assistantFirmList.refetch();
  };

  if (assistantFirmList.data?.firmId) {
    return (
      <section className="scrollableContainer flex h-72 w-[310px] flex-col items-center  overflow-y-scroll">
        <div className=" m-4 ml-6 ">
          {/* <h2 className="pb-4 text-xl font-semibold">List of all Assistant:</h2> */}
          <div className="  grid-rows mb-28 grid  w-full gap-y-5">
            <GetUserProfile
              email={assistantFirmList.data.email}
              name={assistantFirmList.data.name}
              image={assistantFirmList.data.image}
            />
          </div>
          <LeaveAssistantFirm refetchData={refetchData} />
        </div>
      </section>
    );
  } else if (assistantFirmList.isFetching || assistantFirmList.isRefetching) {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex h-max min-h-[280px] w-[310px] flex-col items-center overflow-y-scroll">
        {[...Array(1)].map((_, index) => (
          <div key={index} className=" grid-rows grid w-full  gap-y-5 px-12">
            <UserProfileLoading />
          </div>
        ))}
      </div>
      // <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
      //   Loading...
      // </div>
    );
  } else {
    return (
      <div className="flex h-[280px] items-center justify-center bg-blend-color-burn">
        <h1 className=" font-bold">You aren&apos;t under a firm</h1>
      </div>
    );
  }
};

export default AssistantFirmList;
