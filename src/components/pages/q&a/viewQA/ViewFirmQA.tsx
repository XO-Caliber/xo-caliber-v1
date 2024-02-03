import { Input } from "@/components/ui/Input";
import { PenBox, XCircle } from "lucide-react";
import React from "react";

interface AddQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: string;

  handleDelete: (questionId: string) => void;
}
export const ViewFirmQA: React.FC<AddQAProps> = ({
  questionNumber,
  question,
  mark,
  id,
  handleDelete
}) => {
  return (
    <section className="mb-3 flex ">
      <ul
        className={` mr-2 flex w-full items-center justify-between rounded-lg border-2 p-4 
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"}`}
      >
        <li>{questionNumber}.</li>
        <li className="mr-2 w-full pl-4 text-left text-base">{question}</li>
        <li>
          {/* <PenBox size={22} className="mr-4 cursor-pointer text-secondary-foreground" /> */}
        </li>
        <li>
          <XCircle
            size={24}
            className={"mr-2 cursor-pointer text-red-500 hover:text-red-400 "}
            onClick={() => handleDelete(id)}
          />
        </li>
      </ul>
      <div
        className={`flex min-w-16 justify-between gap-2 rounded-lg border-2 border-border p-4 text-center text-lg
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"}`}
      >
        {mark}
      </div>
      {/* <div className="flex "> */}
      {/* <div
          className={`mr-4 mt-2 flex w-[1300px] items-center justify-center rounded-lg bg-black  ${
            questionNumber % 2 === 0 ? "border-2 border-border bg-white" : "border  bg-border"
          }`}
        >
          <div
            className={` mr-4 flex  w-[30px] pl-4 text-center text-[16px] text-black ${
              questionNumber % 2 === 0 ? "bg-white" : "bg-border"
            }`}
          >
            {questionNumber}
          </div>
          <div
            className={`justify-left relative mr-8 flex  w-[1250px]  p-4 pl-4  ${
              questionNumber % 2 == 0 ? "border-2 border-border bg-white" : "border bg-border"
            } relative  border-x-0 border-y-0 text-[16px] `}
          >
            {question}
          </div>
        </div>
        <div
          className={`${
            questionNumber % 2 == 0 ? "border-2 border-border bg-white" : "border bg-border"
          }  mt-2 flex h-16 w-[50px] items-center justify-center rounded-lg
            text-xl text-black `}
        >
          {mark}
        </div>
      </div> */}
    </section>
  );
};

export default ViewFirmQA;
