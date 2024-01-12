"use client";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Value
} from "@radix-ui/react-select";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";
import React, { useState } from "react";

interface QAProps {
  handleOpen: () => void;
  handleData: (values: any) => void;
}

const QAPopUp: React.FC<QAProps> = ({ handleOpen, handleData }) => {
  const [mark, setMark] = useState("");
  const [question, setQuestion] = useState("");
  return (
    <div className="absolute">
      <div className="overflow relative z-10 h-[300px] w-[1000px] rounded-lg border border-t-0 border-black bg-white shadow-2xl">
        <X
          className="absolute left-[970px] h-[28px] cursor-pointer pt-1 text-red-700 hover:text-red-400"
          onClick={handleOpen}
        />
        <div className="rounded-tl-lg rounded-tr-lg  border border-l-0 border-r-0 border-black pt-8"></div>
        <div className="flex p-4 pt-8">
          <Input
            className=" h-[70px] w-[700px] border-2 border-border text-black"
            value={question}
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
          />

          <div className="ml-4 flex items-center justify-center">
            <Select value={mark} onValueChange={(value) => setMark(value)}>
              <SelectTrigger className=" h-[70px] w-[100px] rounded-md bg-black text-white">
                <SelectValue placeholder="10" className="text-white" />
              </SelectTrigger>
              <SelectContent className="w-[100px]  bg-border ">
                <SelectItem value={"20"}>20</SelectItem>
                <SelectItem value={"20"}>30</SelectItem>
                <SelectItem value={"20"}>40</SelectItem>
                <SelectItem value={"20"}>50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button
          variant={"primary"}
          className="relative left-[900px] top-[80px]"
          onClick={() => {
            handleData({ question });
            handleOpen();
          }}
        >
          Save
        </Button>
      </div>
    </div>
  );
};

export default QAPopUp;
