// SingleQA.jsx
"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { useState } from "react";

interface SingleQAProps {
  className: string;
  question: string;
  questionNumber:number;
}

export const SingleQA: React.FC<SingleQAProps> = ({ className, question,questionNumber }) => {
  const [selectedValue, setSelectedValue] = useState("");



  return (
    <div className={`flex border-2 w-[1279px] h-16 items-center justify-center rounded-lg mt-2 ${className}`}>
        <div className="pl-4 w-[30px] mr-4 text-center text-white">{questionNumber}</div>
      <div className="pl-4 w-[1030px] mr-12">{question}</div>
      <div className="mr-4">
        <Select>
          <SelectTrigger 
            className={`w-[150px] ${selectedValue === "yes" ? "bg-black text-white" : ""} ${
              selectedValue === "no" ? "bg-muted_gray text-white" : "bg-black text-white"
            }`}
          >
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent >
            <SelectItem value="yes" onClick={()=>setSelectedValue("yes")}>Yes</SelectItem>
            <SelectItem value="no" onClick={()=>setSelectedValue("no")}>No</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default SingleQA;
