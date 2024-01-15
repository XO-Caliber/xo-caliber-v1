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
  question: string;
  questionNumber: number;
}

export const GetSingleQA: React.FC<SingleQAProps> = ({ question, questionNumber }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <div
      className={`mt-2 flex  w-[1500px] items-center justify-center rounded-lg  border-2 ${
        questionNumber % 2 == 0 ? "bg-white" : "bg-border"
      }`}
    >
      <div className="mr-4 w-[30px] pl-4 text-center text-black">{questionNumber}</div>
      <div className="mr-8 w-[1200px] p-4 pl-4">{question}</div>
      <div className="mr-4">
        <Select onValueChange={handleChange}>
          <SelectTrigger
            className={`w-[150px] ${selectedValue === "yes" ? "bg-black text-white" : ""} ${
              selectedValue === "no" ? "bg-[#64748B] text-white" : ""
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
  );
};
