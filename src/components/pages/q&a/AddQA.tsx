import { Input } from "@/components/ui/Input";
import { XCircle } from "lucide-react";
import React from "react";

interface AddQAProps {
  questionNumber: number;
  question: string;
}
export const AddQA: React.FC<AddQAProps> = ({ questionNumber, question }) => {
  return (
    <div className={``}>
      <div className="ml-60 flex ">
        <div
          className={` mr-4 mt-2 flex h-16 w-[1300px] items-center justify-center rounded-lg border-2 ${
            questionNumber % 2 === 0 ? "bg-white" : "bg-border"
          }`}
        >
          <div
            className={` mr-4 w-[30px] pl-4 text-center text-black ${
              questionNumber % 2 === 0 ? "bg-white" : "bg-border"
            }`}
          >
            {questionNumber}
          </div>
          <div
            className={`justify-left fixed mr-8 flex h-16 w-[1250px] items-center pl-4 text-[16px] ${
              questionNumber % 2 == 0 ? "bg-white" : "bg-border"
            } relative text-wrap border-2 border-x-0 border-border`}
          >
            {question}
          </div>
          <XCircle
            className={`mr-8 cursor-pointer text-red-700 hover:text-red-400 ${
              questionNumber % 2 == 0 ? "bg-white" : "bg-border"
            }`}
          />
        </div>

        <Input
          className={`${
            questionNumber % 2 == 0 ? "bg-white" : "bg-border"
          }  mt-2 flex h-16 w-[50px]  rounded-lg text-xl ${
            questionNumber % 2 == 0 ? "bg-white" : "bg-border"
          }`}
        />
      </div>
    </div>
  );
};

export default AddQA;
