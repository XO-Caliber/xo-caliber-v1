"use client";
import { trpc } from "@/app/_trpc/client";
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
}
export const ViewClientQA: React.FC<SingleQAProps> = ({
  questionNumber,
  question,
  mark,
  questionId,
  userId
}) => {
  const [selectedValue, setSelectedValue] = useState("");
  const router = useRouter();

  const { mutate: addUserAnswer } = trpc.addUserAnswer.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
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
              <SelectItem value="YES">Yes</SelectItem>
              <SelectItem value="NO">No</SelectItem>
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
