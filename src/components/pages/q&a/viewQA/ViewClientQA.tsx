"use client";
import { trpc } from "@/app/_trpc/client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { toast } from "@/hooks/use-toast";

import { useRouter } from "next/navigation";
import { useState } from "react";

interface SingleQAProps {
  questionNumber: number;
  question: string;
  mark: string;
  questionId: string;
  userId: string;
  userAnswer: any;
}
export const ViewClientQA: React.FC<SingleQAProps> = ({
  questionNumber,
  question,
  mark,
  questionId,
  userId,
  userAnswer
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();
  // const getuserAnswer = trpc.getUserAnswer.useQuery({ userId });
  // const { data: userAnswer } = getuserAnswer;

  const { mutate: addUserAnswer } = trpc.answer.addUserAnswer.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
        // getuserAnswer.refetch();
        toast({
          title: "Answer added",
          description: "Answer was added to the question"
        });
      }
    },
    onError(err) {
      toast({
        title: "Somethin went wrong",
        description: `Try again ${err}`,
        variant: "destructive"
      });
    },
    onSettled() {
      // setLoading(false);
    }
  });

  const handleChange = (value: string) => {
    setSelectedValue(value);
    console.log(value);
    if (userId) {
      if (value == "YES") addUserAnswer({ questionId, userId, answer: "YES" });
      else if (value == "NO") addUserAnswer({ questionId, userId, answer: "NO" });
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <section className="mb-3 flex select-none">
          <ul
            className={`mr-2 flex w-full items-center justify-between gap-2 rounded-lg border-2  p-4
        ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
          >
            <li>{questionNumber}.</li>
            <li className="w-full pl-4 text-left text-base">{question}</li>
            <li>
              <Select onValueChange={handleChange}>
                <SelectTrigger
                  className={`w-[150px] ${selectedValue === "YES" && "bg-black text-white"} ${
                    selectedValue === "NO" && "bg-muted text-white"
                  } ${userAnswer === "YES" && "bg-black text-white"} ${userAnswer === "NO" && "bg-muted text-white"}`}
                >
                  <SelectValue placeholder={userAnswer || "Select"} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="YES">Yes</SelectItem>
                  <SelectItem value="NO">No</SelectItem>
                </SelectContent>
              </Select>
            </li>
          </ul>
          {/* <div
        className={`flex min-w-16 justify-between gap-2 rounded-lg border-2 border-border p-4
      ${questionNumber % 2 === 0 ? "border-[#E5EBF2] bg-[#F6F6F7]" : "border-border"} shadow-md`}
      >
        {mark}
      </div> */}
        </section>
      </DialogTrigger>
      <DialogContent className="min-w-96 select-none">
        <DialogHeader>
          <DialogTitle>Question</DialogTitle>
        </DialogHeader>
        <DialogDescription className="text-md">{question}</DialogDescription>
      </DialogContent>
    </Dialog>
  );
};
