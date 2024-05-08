import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { AddAssistantForm } from "./firm/AddAssistantForm";
import { AddClientForm } from "./firm/AddClientForm";
import { AssistantList } from "./firm/AssistantList";
import { UserList } from "./firm/UserList";
import { AssistantDialog } from "../q&a/addAssistant/AssistantDialog";
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

export const FirmHome = async ({ user }: userProps) => {
  return (
    <section className="flex flex-row items-start justify-normal bg-dotted-spacing-3 bg-dotted-gray-200">
      <div className="ml-8 mt-4 w-[350px] justify-self-center p-4">
        <AddClientForm />
        <br />
        <AddAssistantForm />
      </div>
      <span
        className="border-l-2 border-border pr-4"
        style={{ height: "calc(100vh - 70px)" }}
      ></span>
      <ul className="mr-12 flex h-max w-max flex-col justify-start">
        <HomeLink name={user.name} />
        {/* <div className="flex w-[400px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
          <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
            Assign Assistant
          </h1>
          <AssistantDialog />
        </div> */}
        <li className="ml-4 mt-12 flex flex-row items-start justify-start gap-y-4 space-x-4 pl-4 font-bold">
          <div className="flex flex-col items-center justify-center space-y-9">
            <div className="flex flex-row space-x-6">
              <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 bg-white p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground bg-gradient-to-r from-[#dd0839] to-[#39468f]  p-1 text-white">
                  Your Assistants
                </h1>
                <AssistantList />
              </div>
              <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 bg-white p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground bg-gradient-to-r from-[#dd0839] to-[#39468f]  p-1 text-white">
                  Your Clients
                </h1>
                <UserList userId={user.id} />
              </div>
            </div>
          </div>
        </li>
      </ul>
    </section>
  );
};
