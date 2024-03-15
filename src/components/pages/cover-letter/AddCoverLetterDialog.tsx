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

const AddCoverLetterDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"dark"}>
          <PlusSquare size={16} className="mr-2" />
          Create Cover letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>Add Cover Letter</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-96 w-[1000px]">
          {/* <div>
            <h1 className="mb-2 text-2xl font-bold">Section-1</h1>
            <h2 className="text-sm">
              Field of Endeavor: Enterprise Hybrid Big Data Analytics and Infrastructure Security
              Platform Consultant
            </h2>
          </div> */}
          <CoverLetterEditor />
        </section>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoverLetterDialog;
