"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { UserPlus } from "lucide-react";
import AddSectionDialog from "../AddSectionDialog";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";

export const ClientCoverLetter = ({ user }: { user: Baseuser }) => {
  const {
    data: CoverLetterData,
    isLoading,
    error
  } = trpc.coverletter.getCoverLetter.useQuery({ role: "INDIVIDUAL", userId: user.id });

  return (
    <section>
      <div className="flex items-center justify-around">
        <ul className="ml-4 pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
          <h2 className="text-sm font-normal ">Here is the overview</h2>
        </ul>
        <Button variant={"outline"}>
          <UserPlus size={16} className="mr-2" />
          Assign Assistant
        </Button>
        <AddCoverLetterDialog userId={user.id} role="INDIVIDUAL" />
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData} userId={user.id} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default ClientCoverLetter;
