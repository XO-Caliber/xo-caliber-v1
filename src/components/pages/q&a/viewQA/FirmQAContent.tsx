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
          description: "Succesfully updated the question"
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
              className={` mr-2 flex w-full items-center justify-between rounded-lg border-2 px-4 text-xs 
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border bg-white"}  shadow-md`}
            >
              <li>{questionNumber}.</li>
              <li className="flex w-full items-center justify-start gap-x-1 pl-4 text-left text-base">
                <p>{question}</p>
              </li>
            </ul>
            <div
              className={`flex justify-between gap-2 rounded-lg border-2 border-border p-2 text-xs 
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
            >
              {mark}
            </div>
          </section>
        </DialogTrigger>
        <DialogContent className="my-2 min-w-60 select-none">
          <DialogHeader className="flex flex-row items-center justify-between">
            <div>
              <DialogTitle className="flex items-center justify-center space-x-1">
                <p>Question {questionNumber} </p>
                <Trash
                  size={15}
                  onClick={() => handleDelete(id)}
                  className="cursor-pointer fill-destructive text-destructive"
                />
              </DialogTitle>
            </div>
          </DialogHeader>
          <section className="rounded-sm  ">
            <ul className="flex items-center justify-center p-4">
              <li>
                <Textarea
                  value={Question}
                  onChange={(e) => setQuestion(e.target.value)}
                  className="w-[400px]"
                />
              </li>
            </ul>
          </section>
          <DialogFooter className="flex flex-row items-center justify-center  rounded-md bg-secondary p-2">
            <p>
              <div className=" mr-14 flex flex-row items-center justify-around space-x-12">
                <p className="mr-2 text-sm"> Weightage:{mark}</p>

                <div className=" flex flex-row items-center justify-center">
                  <p className="mr-4 text-sm">Edit</p>
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
                      <SelectItem value={"1000"}>1000</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </p>
            <form onSubmit={onSubmit}>
              <Button variant={"dark"} size={"sm"} isLoading={isLoading}>
                Save
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FirmQAContent;
