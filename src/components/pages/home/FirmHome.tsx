import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { AddAssistantForm } from "../dashboard/firm/AddAssistantForm";
import { AddClientForm } from "../dashboard/firm/AddClientForm";
import { AssistantList } from "../dashboard/firm/AssistantList";
import { UserList } from "../dashboard/firm/UserList";

interface userProps {
  user: string | undefined | null;
}

export const FirmHome = async ({ user }: userProps) => {
  const session = await getAuthSession();

  return (
    <section className="flex flex-row items-start justify-normal ">
      <ul className="flex w-1/2 flex-col  justify-start">
        {/* <li className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-semibold ">Welcome {user}</h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li> */}
        <li className="ml-4 mt-12 flex flex-row items-start justify-start gap-y-4 space-x-4 pl-4 font-bold">
          {/* <Tabs defaultValue="assistant" className="mt-4 w-fit rounded-lg border-2 p-2 shadow-lg">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
             
              <AssistantList />
            </TabsContent>
            <TabsContent value="users">
             
              <UserList userId={session?.user.id} />
            </TabsContent>
          </Tabs> */}
          <div className="flex w-[320px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
            <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
              Your Assistants
            </h1>
            <AssistantList />
          </div>
          <div className="flex w-[320px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
            <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
              Your Clients
            </h1>
            <UserList userId={session?.user.id} />
          </div>
        </li>
      </ul>
      <span
        className=" border-l-2 border-border pr-4"
        style={{ height: "calc(100vh - 100px)" }}
      ></span>
      <div className="ml-8 mt-4 w-[350px] justify-self-center p-4">
        <AddClientForm />
        <br />
        <AddAssistantForm />
      </div>
    </section>
  );
};
