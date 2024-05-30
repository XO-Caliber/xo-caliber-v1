"use client";
import { Button } from "@/components/ui/Button";
import { Baseuser } from "@/types/BaseUser";
import { Download, Info, Loader2 } from "lucide-react";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { CoverLetterType } from "@/types/CoverLetter";
import { trpc } from "@/app/_trpc/client";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { toast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import InstructionVideo from "../../home/InstructionVideo";

export const ClientCoverLetter = ({ user }: { user: Baseuser }) => {
  const [loading, setLoading] = useState(false);
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "INDIVIDUAL",
    userId: user.id
  });
  let selectedCoverLetter;
  const defaultTemplate = trpc.coverletter.getAdminTemplate.useQuery();
  const { mutate: downloadTemplate } = trpc.coverletter.downloadTemplate.useMutation({
    onSuccess({ success }) {
      setLoading(false);
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
      setLoading(true);
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
    <section className="overflow-x-scroll">
      {/* {loading && (
        <div className="absolute z-50 grid h-screen w-full place-content-center bg-black/30">
          <Loader2 size={50} className="animate-spin" />
        </div>
      )} */}
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 bg-white pr-4">
        <div className="flex items-center justify-center">
          <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">Craft</p>
          <Dialog>
            <DialogTrigger asChild>
              <Info size={18} className="mt-1.5 cursor-pointer text-heading" />
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </div>
        <div className="flex items-center space-x-9">
          <InstructionVideo videoLink="https://www.youtube.com/embed/5XpS1ztDkYs?si=pi7cJN48ZI2D1Qb5" />
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"dark"}>Pull Default Template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="mt-4">Select your template and click to pull</DialogTitle>
              <DialogClose>
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
              </DialogClose>
            </DialogContent>
          </Dialog>
          <AddCoverLetterDialog userId={user.id} role="INDIVIDUAL" refetchCaseData={refetchData} />
        </div>
      </div>
      <div className="flex items-center justify-around p-2"></div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter
          //@ts-ignore
          CoverLetterData={CoverLetterData.data}
          userId={user.id}
          refetchCaseData={refetchData}
        />
        {loading && <Skeleton className="m-2 h-12 rounded-none rounded-t-lg p-3" />}
      </div>
    </section>
  );
};

export default ClientCoverLetter;
