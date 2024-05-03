"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { UserPlus } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { toast } from "@/hooks/use-toast";
import { user } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";

export const ClientCoverLetter = ({ user }: { user: Baseuser }) => {
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "INDIVIDUAL",
    userId: user.id
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

  const onSubmit = () => {
    try {
      downloadTemplate(user.id);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <section>
      <div className="flex items-center justify-around">
        <ul className="ml-4 pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
          <h2 className="text-sm font-normal ">Here is the overview</h2>
        </ul>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant={"outline"}>Download Default Template</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogTitle className="mt-4">Do you want to download default template</DialogTitle>
            <DialogFooter>
              <Button variant={"dark"} onClick={onSubmit}>
                Yes,continue
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
        <AddCoverLetterDialog userId={user.id} role="INDIVIDUAL" />
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user.id} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default ClientCoverLetter;
