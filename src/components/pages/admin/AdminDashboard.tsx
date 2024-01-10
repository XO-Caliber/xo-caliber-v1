import React from "react";
import { AddFirmForm } from "./AddFirmForm";
import { FirmList } from "../firm/FirmList";
import { string } from "zod";

interface userProps {
  user: string | undefined | null;
}

const AdminDashboard = ({ user }: userProps) => {
  return (
    <section className="flex flex-row">
      <ul className="flex w-1/2 flex-col items-center justify-start">
        <li className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-semibold ">Welcome {user}</h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li>
        <li className="mt-4 w-[350px] justify-self-center p-4">
          <AddFirmForm />
        </li>
      </ul>
      <div className="mr-4">
        <FirmList />
      </div>
    </section>
  );
};

export default AdminDashboard;
