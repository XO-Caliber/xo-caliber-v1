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
import { CardHeader, CardTitle } from "@/components/ui/Card";
import { string } from "zod";

interface QAProps {
  handleOpen: () => void;
  handleData: (values: any) => void;
  questions: { id: number; question: string; mark: number }[];
}

const QAPopUp: React.FC<QAProps> = ({ handleOpen, handleData, questions }) => {
  const [mark, setMark] = useState("10");
  const [question, setQuestion] = useState("");

  const checkLength = () => {
    if (question.length < 10) {
      return;
    }
    handleData({ question, mark, id: questions[questions.length - 1].id + 1 });
  };
  return (
    <div className="absolute">
      <div className="overflow relative z-10 h-[270px] w-[1000px] rounded-lg border border-t-0 border-white bg-secondary-foreground shadow-2xl">
        <p className="absolute ml-4 mt-2 text-sm text-white">Edit</p>
        <X
          className="absolute left-[970px] h-[28px] cursor-pointer pt-1 text-white hover:text-red-400"
          onClick={handleOpen}
        />
        <div className="h-8 rounded-tl-md rounded-tr-md border border-l-0 border-r-0 border-white bg-slate-900"></div>
        <CardTitle className="ml-4 pt-4 text-white">Question</CardTitle>
        <div className="flex p-4 pt-4">
          <Input
            className=" h-[90px] w-[700px] border-2 border-border text-[18px] text-black"
            value={question}
            type="text"
            onChange={(e) => setQuestion(e.target.value)}
          />
          <div className="ml-4  flex w-[190px] items-center justify-center rounded-lg border border-white bg-border p-4">
            <p className="mr-4 text-sm">Select Mark:</p>
            <Select onValueChange={(value) => setMark(value)}>
              <SelectTrigger className="h-[45px]  w-[50px] rounded-md bg-white text-black">
                <SelectValue placeholder="10" />
              </SelectTrigger>
              <SelectContent className="w-[50px]  bg-border ">
                <SelectItem value={"20"}>20</SelectItem>
                <SelectItem value={"30"}>30</SelectItem>
                <SelectItem value={"40"}>40</SelectItem>
                <SelectItem value={"50"}>50</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <Button
          variant={"primary"}
          className="relative left-[900px] top-[20px]"
          onClick={() => {
            checkLength();
            handleOpen();
          }}
        >
          Save
        </Button>
        <Button
          variant={"outline"}
          className="relative left-[730px] top-[20px] "
          onClick={() => handleOpen()}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default QAPopUp;
