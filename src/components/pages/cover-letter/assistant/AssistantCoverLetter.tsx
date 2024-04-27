"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { UserPlus } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { useEffect, useState } from "react";
import { trpc } from "@/app/_trpc/client";
import AssistantUserSelect from "../../spider-graph/assistant/AssistantUserSelect";

export const AssistantCoverLetter = () => {
  // const categoriesResult = trpc.coverletter.getAssistantCoverLetter.useQuery(user);
  const [user, setUser] = useState("");
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "ASSISTANT",
    userId: user
  });

  const getSelectedUser = (userId: string) => {
    setUser(userId);
  };
  useEffect(() => {
    CoverLetterData.refetch();
  }, [user]);
  return (
    <section>
      <div className="flex items-center justify-around">
        {/* <ul className="ml-4 pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
          <h2 className="text-sm font-normal ">Here is the overview</h2>
        </ul> */}
        <Button variant={"outline"}>
          <UserPlus size={16} className="mr-2" />
          Assign Assistant
        </Button>
        <AddCoverLetterDialog userId={user} role="ASSISTANT" />
        <AssistantUserSelect getSelectedUser={getSelectedUser} />
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default AssistantCoverLetter;
