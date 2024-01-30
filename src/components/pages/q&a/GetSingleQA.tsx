"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { useState } from "react";

interface SingleQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: string;
}

export const GetSingleQA: React.FC<SingleQAProps> = ({ questionNumber, question, mark, id }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div className="flex">
      <div
        className={`mr-2 mt-2 flex w-[1300px] items-center justify-center rounded-lg border-2 ${
          questionNumber % 2 == 0 ? "bg-white" : "bg-border"
        }`}
      >
        <div className="mr-4 w-[30px] pl-4 text-center text-black">{questionNumber}</div>
        <div className="mr-8 w-[1200px] p-4 pl-4">{question}</div>
        <div className="mr-4">
          <Select onValueChange={handleChange}>
            <SelectTrigger
              className={`w-[150px] ${selectedValue === "yes" && "bg-black text-white"} ${
                selectedValue === "no" && "bg-muted text-white"
              }`}
            >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="yes">Yes</SelectItem>
              <SelectItem value="no">No</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div
        className={`${
          questionNumber % 2 == 0 ? "border-2 border-border bg-white" : "border bg-border"
        }  mt-2 flex w-[50px] items-center justify-center rounded-lg
      text-xl text-black `}
      >
        {mark}
      </div>
    </div>
  );
};
