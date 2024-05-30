"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { Info, UserPlus } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";
import InstructionVideo from "../../home/InstructionVideo";

export const AdminCoverLetter = ({ user }: { user: Baseuser }) => {
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "ADMIN",
    userId: user.id
  });

  const refetchData = () => {
    CoverLetterData.refetch();
  };
  return (
    <section className="bg-dotted-spacing-3 bg-dotted-gray-200">
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 bg-white pr-4">
        <div className="flex items-center justify-center">
          <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">Craft</p>
          <span title="">
            <Info size={18} className="mt-1  cursor-pointer text-heading" />
          </span>
        </div>
        <InstructionVideo videoLink="https://www.youtube.com/embed/5XpS1ztDkYs?si=pi7cJN48ZI2D1Qb5" />
        <AddCoverLetterDialog userId={user.id} role="ADMIN" refetchCaseData={refetchData} />
      </div>

      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/*@ts-ignore */}
        <ViewCoverLetter
          //@ts-ignore
          CoverLetterData={CoverLetterData.data}
          userId={user.id}
          refetchCaseData={refetchData}
        />
      </div>
    </section>
  );
};

export default AdminCoverLetter;
