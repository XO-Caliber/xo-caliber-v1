import React from "react";
import AssistantFirmList from "./assistant/AssistantFirmList";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { AssistantUserList } from "./assistant/AssistantUserList";

export const AssistantHome = async () => {
  const session = await getAuthSession();
  return (
    <>
      {session && (
        <section className="flex flex-row items-start justify-normal ">
          <ul className="flex w-1/2 flex-col  justify-start">
            <li className="ml-4 mt-12 flex flex-row items-start justify-start gap-y-4 space-x-4 pl-4 font-bold">
              <div className="flex flex-col items-center justify-center space-y-9">
                <div className="flex flex-row space-x-6">
                  <div className="flex w-[320px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                    <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground bg-gradient-to-r from-[#dd0839] to-[#39468f]  p-1 text-white">
                      Your Firm
                    </h1>
                    <AssistantFirmList user={session?.user.id} />
                  </div>
                  <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                    <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground bg-gradient-to-r from-[#dd0839] to-[#39468f]  p-1 text-white">
                      Assigned Assistants
                    </h1>
                    <AssistantUserList />
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <span
            className=" min-h-[93vh] border-l-2 border-border pr-4"
            style={{ height: "calc(100vh - 100px)" }}
          ></span>
          <div className="ml-8 mt-4 w-[350px] justify-self-center p-4"></div>
        </section>
      )}
    </>
  );
};
