import React from "react";
import { AddAssistantForm } from "./firm/AddAssistantForm";
import { AssistantList } from "./firm/AssistantList";
import { AddClientForm } from "./firm/AddClientForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";

interface userProps {
  user: string | undefined | null;
}

export const FirmDashboard = ({ user }: userProps) => {
  return (
    <section className="flex flex-row items-center justify-normal ">
      <ul className="flex w-1/2 flex-col  justify-start">
        <li className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-semibold ">Welcome {user}</h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li>
        <li className="ml-4  pl-4 font-bold">
          <Tabs defaultValue="assistant" className="mt-4 w-[300px]">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="assistant">Assistant</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
            </TabsList>
            <TabsContent value="assistant">
              <AssistantList />
            </TabsContent>
            <TabsContent value="users">
              {/* <AssistantList /> */}
              Users List
            </TabsContent>
          </Tabs>
        </li>
      </ul>
      {/* <span className="h-full border-l-2 border-border"></span> */}
      <div className="ml-8 mt-4 w-[350px] justify-self-center p-4">
        <AddClientForm />
        <br />
        <AddAssistantForm />
      </div>
    </section>
  );
};
