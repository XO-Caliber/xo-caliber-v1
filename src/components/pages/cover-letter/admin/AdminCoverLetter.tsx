"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { Info, UserPlus } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";

export const AdminCoverLetter = ({ user }: { user: Baseuser }) => {
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "ADMIN",
    userId: user.id
  });

  const refetchData1 = () => {
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

        <AddCoverLetterDialog userId={user.id} role="ADMIN" />
      </div>

      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user.id} />
      </div>
    </section>
  );
};

export default AdminCoverLetter;
