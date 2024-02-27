import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { toast } from "@/hooks/use-toast";
import { Info, Trash, XCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
interface AddQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  id: string;
  handleDelete: (questionId: string) => void;
  refetchData: () => void;
}
export const FirmQAContent: React.FC<AddQAProps> = ({
  questionNumber,
  question,
  mark,
  id,

  handleDelete,
  refetchData
}) => {
  const [isLoading, setLoading] = useState(false);
  const [Question, setQuestion] = useState(question);
  const [Mark, setMark] = useState(mark);
  const router = useRouter();
  const { mutate: updateQuestion } = trpc.question.updateQuestions.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "Question Updated",
          description: "Your new question data was updated successfully"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        variant: "destructive"
      });
    },
    onSettled() {
      setLoading(false);
    }
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!Question.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid question.",
        variant: "destructive"
      });
      return;
    }
    try {
      setLoading(true);
      updateQuestion({
        question: Question,
        mark: parseInt(Mark),
        questionId: id
      });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <section className="mb-3 flex select-none">
            <ul
              className={` mr-2 flex w-full items-center justify-between rounded-lg border-2  px-4 
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"}  shadow-md`}
            >
              <li>{questionNumber}.</li>
              <li className="w-full pl-4 text-left text-base ">{question}</li>

              {/* <XCircle
                size={24}
                className={"mr-2 cursor-pointer text-red-500 hover:text-red-400 "}
                onClick={() => handleDelete(id)}
              /> */}

              {/* <Info
                xlinkTitle="Tap to see detailed question overFirm "
                className="cursor-pointer"
              /> */}
            </ul>
            <div
              className={`flex justify-between gap-2 rounded-lg border-2 border-border p-4 
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
            >
              {mark}
            </div>
          </section>
        </DialogTrigger>
        <DialogContent className="min-w-60 select-none">
          <DialogHeader>
            <DialogTitle>Question {questionNumber}</DialogTitle>
          </DialogHeader>
          <section className="rounded-sm border bg-secondary ">
            <ul className="flex items-center justify-center p-4">
              <li>
                <Textarea
                  value={Question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="h-[200px] w-[400px]"
                />
              </li>
              <li className="ml-4 rounded-md bg-secondary-foreground p-1 p-2">
                <text className="text-white"> Mark:{mark}</text>
              </li>
              <li>
                <div className="ml-4 flex">
                  <text className="mr-4 font-bold">Change mark:</text>
                  <Select onValueChange={(value) => setMark(value)}>
                    {/* <SelectTrigger className="h-[45px] w-[70px]  rounded-md bg-muted text-black"> */}
                    <SelectTrigger className="">
                      <SelectValue placeholder={Mark} />
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
                      <SelectItem value={"100"}>100</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </li>
            </ul>
          </section>
          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button variant={"primary"} isLoading={isLoading}>
                Save
              </Button>
            </form>
            <Button variant={"destructive"} onClick={() => handleDelete(id)}>
              <Trash size={15} />
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FirmQAContent;
