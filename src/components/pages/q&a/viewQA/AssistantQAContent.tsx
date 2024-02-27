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

import { Info, Trash, XCircle } from "lucide-react";
import React from "react";

interface AddQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: string;
}
export const AssistantQAContent: React.FC<AddQAProps> = ({
  questionNumber,
  question,
  mark,
  id
}) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <section className="mb-3 flex select-none">
            <ul
              className={` mr-2 flex w-full items-center justify-between rounded-lg border-2  px-4 
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"}  shadow-md`}
            >
              <li>{questionNumber}.</li>
              <li className="w-full pl-4 text-left text-base ">{question}</li>

              {/* <XCircle
                size={24}
                className={"mr-2 cursor-pointer text-red-500 hover:text-red-400 "}
                onClick={() => handleDelete(id)}
              /> */}

              {/* <Info
                xlinkTitle="Tap to see detailed question overview "
                className="cursor-pointer"
              /> */}
            </ul>
            <div
              className={`flex justify-between gap-2 rounded-lg border-2 border-border p-4 
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
            >
              {mark}
            </div>
          </section>
        </DialogTrigger>
        <DialogContent className="min-w-60 select-none">
          <DialogHeader>
            <DialogTitle>Question</DialogTitle>
          </DialogHeader>
          <section className="rounded-sm border bg-secondary ">
            <ul className="flex items-center justify-center p-4">
              <li>{question}</li>
              <li className="ml-4 rounded-md bg-secondary-foreground p-1 text-white">
                Mark:{mark}
              </li>
            </ul>
          </section>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AssistantQAContent;
