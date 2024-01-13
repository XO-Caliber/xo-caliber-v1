import { Input } from "@/components/ui/Input";
import { XCircle } from "lucide-react";
import React from "react";

interface AddQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: number;
  handleDelete: (questionNumber: number) => void;
}
export const AddQA: React.FC<AddQAProps> = ({
  questionNumber,
  question,
  mark,
  id,
  handleDelete
}) => {
  return (
    <div className={``}>
      <div className="ml-60 flex ">
        <div
          className={` mr-4 mt-2 flex h-16 w-[1300px] items-center justify-center rounded-lg  ${
            questionNumber % 2 === 0 ? "border-2 border-border bg-white" : "border  bg-border"
          }`}
        >
          <div
            className={` mr-4 w-[30px] pl-4 text-center text-[16px] text-black ${
              questionNumber % 2 === 0 ? "bg-white" : "bg-border"
            }`}
          >
            {questionNumber}
          </div>
          <div
            className={`justify-left fixed mr-8 flex h-16 w-[1250px] items-center pl-4  ${
              questionNumber % 2 == 0 ? "border-2 border-border bg-white" : "borderbg-border"
            } relative  border-x-0 text-[16px] `}
          >
            {question}
          </div>
          <XCircle
            className={`mr-8 cursor-pointer text-red-700 hover:text-red-400 ${
              questionNumber % 2 == 0 ? "bg-white" : "bg-border"
            }`}
            onClick={() => handleDelete(id)}
          />
        </div>

        <div
          className={`${
            questionNumber % 2 == 0 ? "border-2 border-border bg-white" : "border bg-border"
          }  mt-2 flex h-16 w-[50px] items-center justify-center rounded-lg
            text-xl text-black `}
        >
          {mark}
        </div>
      </div>
    </div>
  );
};

export default AddQA;
