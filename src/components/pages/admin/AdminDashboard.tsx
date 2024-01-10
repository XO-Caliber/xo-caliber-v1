import React from "react";
import { AddFirmForm } from "./AddFirmForm";
import { FirmList } from "../firm/FirmList";

const AdminDashboard = () => {
  return (
    <section className="grid w-full grid-flow-col">
      <ul className=" flex w-full flex-col justify-start">
        <li className="m-4 w-full font-bold">
          <h1 className="text-2xl font-semibold ">Welcome </h1>
          <h2 className="text-sm font-normal ">All details of your clients</h2>
        </li>
        <li className="w-[350px]  p-4">
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
