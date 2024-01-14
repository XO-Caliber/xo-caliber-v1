"use client";
import { Input } from "@/components/ui/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";
import { CardHeader, CardTitle } from "@/components/ui/Card";
import { string } from "zod";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";

interface QADialogContentProps {
  handleOpen: () => void;
  handleData: (values: any) => void;
  datas: { category: string; questions: { id: number; question: string; mark: string }[] }[];
}

const QADialogContent: React.FC<QADialogContentProps> = ({ handleOpen, handleData, datas }) => {
  const [mark, setMark] = useState("10");
  const [question, setQuestion] = useState("");

  const checkLength = () => {
    if (question.length < 10) {
      return;
    }
    handleData({ question, mark, id: datas[datas.length - 1].questions.length });
  };
  // console.log(question, mark);

  return (
    // <Input className="h-40 w-full " />
    <section className="flex w-[600px] flex-row items-center gap-4">
      <div className="grid w-full gap-1.5 pt-4">
        <Label htmlFor="message-2">Your Question</Label>
        <Textarea placeholder="Type your message here." id="message-2" className="w-full" />
        <p className="text-sm text-muted-foreground">
          This question will be viewed and answered by all of your clients.
        </p>
      </div>
      <div className="flex flex-col gap-4">
        <Select onValueChange={(value) => setMark(value)}>
          {/* <SelectTrigger className="h-[45px] w-[70px]  rounded-md bg-muted text-black"> */}
          <SelectTrigger className="">
            <SelectValue placeholder="10" />
          </SelectTrigger>
          <SelectContent className="w-[50px] ">
            <SelectItem value={"20"}>20</SelectItem>
            <SelectItem value={"30"}>30</SelectItem>
            <SelectItem value={"40"}>40</SelectItem>
            <SelectItem value={"50"}>50</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setMark(value)}>
          {/* <SelectTrigger className="h-[45px] w-[70px]  rounded-md bg-white text-black"> */}
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="category 1" />
          </SelectTrigger>
          <SelectContent className=" ">
            <SelectItem value={"20"}>category 1</SelectItem>
            <SelectItem value={"30"}>category 2</SelectItem>
            <SelectItem value={"40"}>category 3</SelectItem>
            <SelectItem value={"50"}>category 4</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
    // <div className="">
    //   <div className="overflow relative z-10 h-[270px] w-[1000px] rounded-lg border border-t-0 border-white bg-secondary-foreground shadow-2xl">
    //     <p className="absolute ml-4 mt-2 text-sm text-white">Edit</p>
    //     <X
    //       className="absolute left-[970px] h-[28px] cursor-pointer pt-1 text-white hover:text-red-400"
    //       onClick={handleOpen}
    //     />
    //     <div className="h-8 rounded-tl-md rounded-tr-md border border-l-0 border-r-0 border-white"></div>
    //     <CardTitle className="ml-4 pt-4 text-white">Question</CardTitle>
    //     <div className="flex p-4 pt-4">
    //       <Input
    //         className=" h-[90px] w-[700px] border-2 border-border text-[18px] text-black"
    //         value={question}
    //         type="text"
    //         onChange={(e) => setQuestion(e.target.value)}
    //       />
    //       <div className="ml-4  flex w-[190px] items-center justify-center rounded-lg border border-white bg-border p-4">
    //         <p className="mr-4 text-sm">Select Mark:</p>
    //       </div>
    //     </div>

    //     <Button
    //       variant={"primary"}
    //       className="relative left-[900px] top-[20px]"
    //       onClick={() => {
    //         checkLength();
    //         handleOpen();
    //       }}
    //     >
    //       Save
    //     </Button>
    //     <Button
    //       variant={"outline"}
    //       className="relative left-[730px] top-[20px] "
    //       onClick={() => handleOpen()}
    //     >
    //       Cancel
    //     </Button>
    //   </div>
    // </div>
  );
};

export default QADialogContent;
