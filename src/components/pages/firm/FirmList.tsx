"use client";
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "@/components/utils/UserProfile";

export const FirmList = () => {
  let page = 1;
  const firmList = trpc.getAllFirm.useQuery(page);

  if (firmList.data) {
    return (
      <div className="w-[500px] border-l-2 border-border">
        <h2>FirmList</h2>
        <div className="w-[200px]">
          {firmList.data.map((user) => (
            <UserProfile key={user.email} email={user.email} name={user.name} />
          ))}
        </div>
      </div>
    );
  } else {
    // If the user does not exist, return an error message
    return (
      // <section
      //   className="absolute left-0 top-0 flex h-full w-full
      // items-center justify-center overflow-hidden
      // bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
      // >
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
        Loading...
      </div>
    );
  }
};
