import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { PlusSquare } from "lucide-react";
import React from "react";
import CoverLetterEditor from "./CoverLetterEditor";

const AddSectionDialog = ({ userId, coverLetterId }: { userId: string; coverLetterId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>
          <PlusSquare size={16} className="mr-2" />
          Create Section
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>Add Cover Letter</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-max w-[1000px] ">
          <CoverLetterEditor userId={userId} coverLetterId={coverLetterId} />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default AddSectionDialog;
