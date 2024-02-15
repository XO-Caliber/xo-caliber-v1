import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { XCircle } from "lucide-react";
import React from "react";

interface AddQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: string;

  handleDelete: (questionId: string) => void;
}
export const ViewQAContent: React.FC<AddQAProps> = ({
  questionNumber,
  question,
  mark,
  id,
  handleDelete
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

              <XCircle
                size={24}
                className={"mr-2 cursor-pointer text-red-500 hover:text-red-400 "}
                onClick={() => handleDelete(id)}
              />
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
          <DialogDescription className="text-md">{question}</DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ViewQAContent;
