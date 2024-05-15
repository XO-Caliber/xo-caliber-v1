"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { Download, DownloadIcon, UserPlus } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { CoverLetterType } from "@/types/CoverLetter";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { toast } from "@/hooks/use-toast";
import { user } from "@/types/user";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { useState } from "react";

export const ClientCoverLetter = ({ user }: { user: Baseuser }) => {
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "INDIVIDUAL",
    userId: user.id
  });
  let selectedCoverLetter;
  const defaultTemplate = trpc.coverletter.getAdminTemplate.useQuery();
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

  const onSubmit = (id: string) => {
    try {
      downloadTemplate({ userId: user.id, coverLetterId: id });
    } catch (e) {
      console.log(e);
    }
  };
  const refetchData = () => {
    CoverLetterData.refetch();
  };
  const handleDownload = ({
    id,
    CoverLetterData
  }: {
    id: string;
    CoverLetterData: CoverLetterType[];
  }) => {
    selectedCoverLetter = CoverLetterData.find((coverLetter) => coverLetter.id === id);
  };
  return (
    <section>
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 bg-white pr-4">
        <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">Craft</p>

        <div className="flex items-center space-x-9">
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"outline"}>Download Pull Default Template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="mt-4">
                Do you want to download pull default template
              </DialogTitle>
              {defaultTemplate.data && (
                <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
                  {defaultTemplate.data.map((coverletter, index) => (
                    <li
                      key={coverletter.id}
                      className={`flex w-fit items-center justify-center 
                  rounded-md border p-1 px-3 text-sm ${
                    index % 2 === 0
                      ? "border-primary bg-primary-light"
                      : "border-muted bg-secondary"
                  }`}
                    >
                      {coverletter.title}
                      <Download
                        className="ml-1 cursor-pointer text-primary"
                        size={16}
                        onClick={() => onSubmit(coverletter.id)}
                      />
                    </li>
                  ))}
                </ul>
              )}

              {/* <DialogFooter>
                <Button variant={"dark"} onClick={onSubmit}>
                  Yes,continue
                </Button>
              </DialogFooter> */}
            </DialogContent>
          </Dialog>
          <AddCoverLetterDialog userId={user.id} role="INDIVIDUAL" />
        </div>
      </div>
      <div className="flex items-center justify-around p-2"></div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user.id} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default ClientCoverLetter;
