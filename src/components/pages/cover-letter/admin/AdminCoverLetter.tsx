"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { UserPlus } from "lucide-react";
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
      <div className="flex items-center justify-around">
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
