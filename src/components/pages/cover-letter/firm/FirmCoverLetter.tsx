"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Download, Info, Loader, UserPlus, X } from "lucide-react";
import { CoverLetterType } from "@/types/CoverLetter";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { useState, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/Dialog";
import InstructionVideo from "../../home/InstructionVideo";

export const FirmCoverLetter = () => {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(false);

  let selectedCoverLetter;
  const CoverLetterData = trpc.coverletter.getCoverLetter.useQuery({
    role: "FIRM",
    userId: user
  });
  const defaultTemplate = trpc.coverletter.getAdminTemplate.useQuery();
  const { mutate: downloadTemplate } = trpc.coverletter.downloadTemplate.useMutation({
    onSuccess({ success }) {
      CoverLetterData.refetch();
      if (success) {
        setLoading(false);
        toast({
          title: "Template Downloaded",
          description: "Template Downloaded Successfully"
        });
      }
    }
  });
  const refetchData = () => {
    CoverLetterData.refetch();
  };
  const onSubmit = (id: string) => {
    try {
      setLoading(true);
      downloadTemplate({ userId: user, coverLetterId: id });
    } catch (e) {
      console.log(e);
    }
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

  const getSelectedUser = (userId: string) => {
    setUser(userId);
  };

  useEffect(() => {
    CoverLetterData.refetch();
  }, [user]);

  return (
    <section className="overflow-x-scroll">
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
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
              <Button variant={"dark"}> Pull Default Template</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle className="mt-4">Click download icon to pull</DialogTitle>
              {defaultTemplate.data && (
                <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
                  {defaultTemplate.data.map((coverletter, index) => (
                    <li
                      key={coverletter.id}
                      onClick={() => onSubmit(coverletter.id)}
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
            </DialogContent>
          </Dialog>
          <UserSelectList getSelectedUser={getSelectedUser} />
          <AddCoverLetterDialog userId={user} role="FIRM" refetchCaseData={refetchData} />
        </div>
      </div>
      <div className="overflow-y-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter
          //@ts-ignore
          CoverLetterData={CoverLetterData.data}
          userId={user}
          refetchCaseData={refetchData}
        />
        <div className="relative flex w-full justify-center">
          {loading && <Loader size={50} className="animate-spin" />}
        </div>
      </div>
    </section>
  );
};

export default FirmCoverLetter;
