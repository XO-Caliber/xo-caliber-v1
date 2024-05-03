"use client";
import { Button } from "@/components/ui/Button";
import UserSelectList from "@/components/utils/UserSelectList";
import { Baseuser } from "@/types/BaseUser";
import { DownloadIcon, UserPlus, X } from "lucide-react";
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
      <div className="mt-2 flex items-center justify-around pb-4">
        {/* <ul className="ml-4 pl-4 pt-4 font-bold">
          <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
          <h2 className="text-sm font-normal ">Here is the overview</h2>
        </ul> */}
        {/* <Button variant={"outline"} onClick={onSubmit}>
          Download Default Template
        </Button> */}
        <AddCoverLetterDialog userId={user} role="FIRM" />
        <UserSelectList getSelectedUser={getSelectedUser} />
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
        </Dialog>
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
