import React from "react";
import { AddAssistantForm } from "./firm/AddAssistantForm";
import { AssistantList } from "./firm/AssistantList";
import { AddClientForm } from "./firm/AddClientForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import { UserList } from "./firm/UserList";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";

interface userProps {
  user: string | undefined | null;
}

export const FirmDashboard = async ({ user }: userProps) => {
  const session = await getAuthSession();

  return (
    <section className="flex flex-row items-start justify-normal ">
      <ul className="flex w-1/2 flex-col  justify-start">
        <li className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-semibold ">Welcome {user}</h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li>
        <li className="ml-4  pl-4 font-bold">
          <Tabs defaultValue="assistant" className="mt-4 w-fit rounded-lg border-2 p-2 shadow-lg">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
              {/* Assistant List */}
              <AssistantList />
            </TabsContent>
            <TabsContent value="users">
              {/* Users List */}
              <UserList userId={session?.user.id} />
            </TabsContent>
          </Tabs>
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
