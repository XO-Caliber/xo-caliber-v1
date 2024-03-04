import React from "react";
import { AddFirmForm } from "./admin/AddFirmForm";
import { FirmList } from "./admin/FirmList";
import { AllUserList } from "./admin/AllUserList";

interface userProps {
  user: string | undefined | null;
}

const AdminHome = ({ user }: userProps) => {
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
          <div className="flex flex-col items-center justify-center space-y-9">
            <div className="flex flex-row space-x-6">
              <div className="flex w-[360px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
                  List of Firms
                </h1>
                <FirmList />
              </div>
              <div className="mx-4 flex w-[360px] flex-col items-center justify-center rounded-md border-2 p-2 shadow-md">
                <h1 className="mb-1 flex w-full items-center justify-center rounded-lg border bg-secondary-foreground p-1 text-white">
                  List of Users
                </h1>
                <AllUserList />
              </div>
            </div>
          </div>
        </li>
      </ul>
      <span
        className=" min-h-[93vh] border-l-2 border-border pr-4"
        style={{ height: "calc(100vh - 100px)" }}
      ></span>
      <div className="ml-8 mt-4 w-[350px] justify-self-center p-4">
        <AddFirmForm />
      </div>
    </section>
  );
};

export default AdminHome;
