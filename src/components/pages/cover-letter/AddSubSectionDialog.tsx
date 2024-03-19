import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { PlusSquare } from "lucide-react";
import React from "react";
import AddSubSectionDialogContent from "./AddSubSectionDialogContent";

const AddSubSectionDialog = ({ userId, sectionId }: { userId: string; sectionId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          // className="border-spacing-1 border border-dashed border-red-400 p-2 "
        >
          <PlusSquare size={16} className="mr-2" />
          Add Sub Section
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
          <AddSubSectionDialogContent userId={userId} sectionId={sectionId} />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubSectionDialog;