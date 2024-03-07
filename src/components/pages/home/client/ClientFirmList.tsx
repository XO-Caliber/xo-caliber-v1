"use client";
import { trpc } from "@/app/_trpc/client";
import { Card, CardContent, CardHeader } from "@/components/ui/Card";
import { UserProfile } from "@/components/utils/UserProfile";
import React from "react";
import LeaveFirmForm from "./LeaveFirmForm";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetUserProfile } from "@/components/utils/GetUserProfile";

const ClientFirmList = () => {
  const clientFirmList = trpc.home.getClientFirm.useQuery();
  const refetchData = () => {
    clientFirmList.refetch();
  };
  if (clientFirmList.data?.Firm?.firmId) {
    return (
      <section className="scrollableContainer flex h-min w-[310px] flex-col items-center  overflow-y-scroll">
        <div className=" m-4 ml-6 flex flex-col items-center justify-center">
          {/* <h2 className="pb-4 text-xl font-semibold">List of all Assistant:</h2> */}
          <div className="  grid-rows mb-28 grid  w-full gap-y-5">
            <GetUserProfile
              email={clientFirmList.data.Firm.email}
              name={clientFirmList.data.Firm.name}
              image={clientFirmList.data.Firm.image}
            />
          </div>
          <LeaveFirmForm refetchData={refetchData} />
        </div>
      </section>
    );
  } else {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex h-max max-h-72 w-[310px] flex-col items-center overflow-y-scroll">
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
  }
};

export default ClientFirmList;
