import React from "react";
import { AddFirmForm } from "./admin/AddFirmForm";
import { FirmList } from "./admin/FirmList";
import { AllUserList } from "./admin/AllUserList";
import { CandlestickChart, CheckSquare, FileEdit, Wind } from "lucide-react";
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

const AdminHome = ({ user }: userProps) => {
  return (
    <section className="flex h-max items-start justify-normal overflow-scroll bg-dotted-spacing-3 bg-dotted-gray-200">
      <ul className="mr-12 flex h-max w-max flex-col justify-start">
        <HomeLink name={user.name} />
        <div className="ml-8 mt-4 w-[350px] justify-self-center p-4">
          <AddFirmForm />
        </div>
      </ul>
      <span
        className="border-l-2 border-border pr-4"
        style={{ height: "calc(100vh - 70px)" }}
      ></span>
      <li className="flex flex-col">
        <div className="ml-4 w-full pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold">User Profiles</h1>
        </div>
        <div className="ml-4 mt-12 flex flex-row items-start justify-start gap-y-4 space-x-4 pl-4 font-bold">
          <div className="flex flex-col items-center justify-center space-y-9">
            <div className="flex flex-row space-x-6">
              <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 bg-white p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-gradient-to-r from-[#dd0839]  to-[#39468f] p-1 text-white">
                  List of Firms
                </h1>
                <FirmList />
              </div>
              <div className="mx-4 flex w-[360px] flex-col items-center justify-center rounded-md border-2 bg-white p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border  border-pink-400  bg-gradient-to-r from-[#dd0839]  to-[#39468f] p-1 text-white">
                  List of Users
                </h1>
                <AllUserList />
              </div>
            </div>
          </div>
        </div>
      </li>
    </section>
  );
};

export default AdminHome;
