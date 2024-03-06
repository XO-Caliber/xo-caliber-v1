import React from "react";
import { ClientAssistantList } from "./client/ClientAssistantList";
import ClientFirmList from "./client/ClientFirmList";
import { HomeLink } from "./HomeLink";

interface userProps {
  user: {
    id: string;
    name?: string | null | undefined;
    email?: string | null | undefined;
    image?: string | null | undefined;
    role: string;
  };
}

export const UserHome = async ({ user }: userProps) => {
  return (
    <section className="flex flex-row items-start justify-normal ">
      <ul className="flex w-1/2 flex-col  justify-start">
        <HomeLink name={user.name} />
        <li className="ml-4 mt-12 flex flex-row items-start justify-start gap-y-4 space-x-4 pl-4 font-bold">
          <div className="flex flex-col items-center justify-center space-y-9">
            <div className="flex flex-row space-x-6">
              <div className="flex w-[320px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
                  Your Firm
                </h1>
                <ClientFirmList />
              </div>
              <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
                  Assigned Assistants
                </h1>
                <ClientAssistantList />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <span
        className="border-l-2 border-border pr-4"
        style={{ height: "calc(100vh - 70px)" }}
      ></span>
      <div className="ml-8 mt-4 w-[350px] justify-self-center p-4"></div>
    </section>
  );
};
