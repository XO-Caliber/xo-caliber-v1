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

export const ViewClientQA: React.FC<SingleQAProps> = ({ questionNumber, question, mark, id }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const handleChange = (value: string) => {
    setSelectedValue(value);
  };

  return (
    <section className="mb-3 flex ">
      <ul
        className={`mr-2 flex w-full items-center justify-between gap-2 rounded-lg border-2  p-4
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
      >
        <li>{questionNumber}.</li>
        <li className="w-full pl-4 text-left text-base">{question}</li>
        <li>
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
        </li>
      </ul>
      <div
        className={`flex justify-between gap-2 rounded-lg border-2 border-border p-4 
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
      >
        {mark}
      </div>
    </section>
  );
};
