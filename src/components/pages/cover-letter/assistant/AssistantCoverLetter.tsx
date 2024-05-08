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
import { toast } from "@/hooks/use-toast";

export const AssistantCoverLetter = () => {
  // const categoriesResult = trpc.coverletter.getAssistantCoverLetter.useQuery(user);
  const [user, setUser] = useState("");
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "ASSISTANT",
    userId: user
  });
  const { mutate: downloadTemplate } = trpc.coverletter.downloadTemplate.useMutation({
    onSuccess({ success }) {
      CoverLetterData.refetch();
      if (success) {
        toast({
          title: "Template Downloaded",
          description: "Template Downloaded Successfully"
        });
      }
    }
  });

  // const onSubmit = () => {
  //   try {
  //     downloadTemplate(user);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // };
  const getSelectedUser = (userId: string) => {
    setUser(userId);
  };
  useEffect(() => {
    CoverLetterData.refetch();
  }, [user]);
  return (
    <section>
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 pr-4">
        <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">Craft</p>

        <div className="flex space-x-9">
          <AddCoverLetterDialog userId={user} role="ASSISTANT" />
          <AssistantUserSelect getSelectedUser={getSelectedUser} />
        </div>
      </div>
      <div className="flex items-center justify-around"></div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default AssistantCoverLetter;
