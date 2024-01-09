import React from "react";
import { AddFirmForm } from "./AddFirmForm";
import { FirmList } from "../firm/FirmList";

const AdminDashboard = () => {
  return (
    <section className="flex w-full items-center justify-between ">
      <div className=" mt-6 w-[360px] ">
        <AddFirmForm />
      </div>
      <div className="mr-4">
        <FirmList />
      </div>
    </section>
  );
};

export default AdminDashboard;
