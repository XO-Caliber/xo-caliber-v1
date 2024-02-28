import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import React from "react";
import { Textarea } from "@/components/ui/Textarea";
import { Label } from "@/components/ui/Label";
import { trpc } from "@/app/_trpc/client";

interface AdminQADialogContentProps {
  question: string;
  mark: string;
  categoryId: string;
  setQuestion: (val: string) => void;
  setCategoryId: (val: string) => void;
  setMark: (val: string) => void;
}
const AdminQADialogContent = ({
  question,
  mark,
  setQuestion,
  setCategoryId,
  setMark
}: AdminQADialogContentProps) => {
  const categoriesResult = trpc.category.getAdminCategory.useQuery();

  return (
    // <Input className="h-40 w-full " />
    <section className="flex w-[600px] flex-row items-center gap-4">
      <div className="grid w-full gap-1.5 pt-4">
        <Label htmlFor="message-2">Your Question</Label>
        <Textarea
          placeholder="Type your message here."
          id="message-2"
          className="w-full"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
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
            <SelectItem value={"10"}>10</SelectItem>
            <SelectItem value={"20"}>20</SelectItem>
            <SelectItem value={"30"}>30</SelectItem>
            <SelectItem value={"40"}>40</SelectItem>
            <SelectItem value={"50"}>50</SelectItem>
            <SelectItem value={"60"}>60</SelectItem>
            <SelectItem value={"70"}>70</SelectItem>
            <SelectItem value={"80"}>80</SelectItem>
            <SelectItem value={"90"}>90</SelectItem>
            <SelectItem value={"100"}>1000</SelectItem>
          </SelectContent>
        </Select>

        <Select onValueChange={(value) => setCategoryId(value)}>
          {/* <SelectTrigger className="h-[45px] w-[70px]  rounded-md bg-white text-black"> */}
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="select" />
          </SelectTrigger>
          <SelectContent className=" ">
            {categoriesResult.data &&
              categoriesResult.data.map((cat) => (
                <SelectItem key={cat.id} value={cat.id}>
                  {cat.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};

export default AdminQADialogContent;
