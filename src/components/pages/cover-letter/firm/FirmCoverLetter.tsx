"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { Download, DownloadIcon, UserPlus, X } from "lucide-react";
import { CoverLetterType } from "@/types/CoverLetter";
import AddCoverLetterDialog from "../AddCoverLetterDialog";
import { ViewCoverLetter } from "../ViewCoverLetter";
import { useState, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectItem,
  SelectContent,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTrigger,
  DialogContent,
  DialogTitle
} from "@/components/ui/Dialog";

export const FirmCoverLetter = () => {
  // const categoriesResult = trpc.coverletter.getFirmCoverLetter.useQuery(user);
  const [user, setUser] = useState("");
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
    <section>
      <div className=" flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">Craft</p>
        <div className="flex items-center space-x-9">
          <Dialog>
            <DialogTrigger>
              <Button variant="outline">
                <DownloadIcon />
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Download PDF</DialogTitle>
                <DialogDescription>Here you can download your case files</DialogDescription>
                {CoverLetterData.data && (
                  <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
                    {CoverLetterData.data.map((coverletter: any, index) => (
                      <li
                        key={coverletter.id}
                        className={`flex w-fit items-center justify-center rounded-md border p-1 px-3 text-sm ${index % 2 === 0 ? "border-primary bg-primary-light" : "border-muted bg-secondary"}`}
                      >
                        {coverletter.title}
                        <DownloadIcon
                          className="ml-1 cursor-pointer text-primary"
                          size={16}
                          onClick={() => handleDownload(coverletter.id)}
                        />
                      </li>
                    ))}
                  </ul>
                )}
              </DialogHeader>
            </DialogContent>
          </Dialog>{" "}
          {defaultTemplate.data && (
            <Select onValueChange={(value) => onSubmit(value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select template" />
              </SelectTrigger>
              <SelectContent>
                {defaultTemplate.data.map((coverletter) => (
                  <SelectItem
                    key={coverletter.id}
                    value={coverletter.id}
                    onClick={() => onSubmit(coverletter.id)}
                  >
                    {coverletter.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
          <UserSelectList getSelectedUser={getSelectedUser} />
          <AddCoverLetterDialog userId={user} role="FIRM" />
        </div>
      </div>
      <div className="mt-2 flex items-center justify-around pb-4">
        {/* <Select>
          <SelectTrigger>
            <SelectValue placeholder="Download pdf"></SelectValue>
          </SelectTrigger>
          <SelectContent>
            {CoverLetterData.data &&
              CoverLetterData.data.map((coverLetter) => (
                <SelectItem key={coverLetter.id} value={coverLetter.id}>
                  {coverLetter.title}
                </SelectItem>
              ))}
          </SelectContent>
        </Select> */}
      </div>
      <div className="overflow-scroll" style={{ height: "calc(100vh - 150px)" }}>
        {/* @ts-ignore */}
        <ViewCoverLetter CoverLetterData={CoverLetterData.data} userId={user} />
      </div>
      {/* <DragNDropSection /> */}
    </section>
  );
};

export default FirmCoverLetter;
