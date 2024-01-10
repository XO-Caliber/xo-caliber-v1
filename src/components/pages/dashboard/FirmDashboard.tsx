import React from "react";
import { AddAssistantForm } from "./firm/AddAssistantForm";
import { AssistantList } from "./firm/AssistantList";

interface userProps {
  user: string | undefined | null;
}

export const FirmDashboard = ({ user }: userProps) => {
  return (
    <section className="flex flex-row">
      <ul className="flex w-1/2 flex-col items-center justify-start">
        <li className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-semibold ">Welcome {user}</h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li>
        <li className="mt-4 w-[350px] justify-self-center p-4">
          <AddAssistantForm />
        </li>
      </ul>
      <div className="mr-4">
        <AssistantList />
      </div>
    </section>
  );
};
