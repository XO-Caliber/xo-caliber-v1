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

const AddExhibitDialog = ({ userId, sectionId }: { userId: string; sectionId: string }) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="border border-dashed border-border py-0 "
        >
          <PlusSquare size={16} className="mr-2" />
          Add Exhibit
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>Add Exhibit</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-max w-[1000px] ">{/* <AddExhibitDialogContent/> */}</section>
      </DialogContent>
    </Dialog>
  );
};

export default AddExhibitDialog;
