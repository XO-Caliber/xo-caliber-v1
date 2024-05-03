"use client";
import { Button } from "@/components/ui/Button";
import React, { useState } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { PlusSquare } from "lucide-react";
import AdminQADialogContent from "./AdminQADialogContent";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";

interface QAProps {
  refetchData: () => void;
}

const AddAdminQADialog = ({ refetchData }: QAProps) => {
  const [mark, setMark] = useState("10");
  const [question, setQuestion] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();

  const { mutate: addQA } = trpc.question.addAdminQuestion.useMutation({
    onSuccess({ success }) {
      refetchData();
      if (success) {
        router.refresh();
        toast({
          title: "Sucessfully added the question"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: "Try again",
        variant: "destructive"
      });
    },
    onSettled() {
      setLoading(false);

      setQuestion("");
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!question.trim()) {
      toast({
        title: "Validation Error",
        description: "Enter a valid question.",
        variant: "destructive"
      });
      return;
    }
    if (categoryId === "") {
      toast({
        title: "Validation Error",
        description: "Select a category",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const data = {
      question,
      mark: parseInt(mark),
      categoryId
    };
    addQA(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 font-medium hover:border"
          // onClick={handleOpen}
          size={"sm"}
        >
          {/* <PlusSquare size={16} /> */}
          <p className="ml-2">Add Q&A</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle> Add Yes or No Questions</DialogTitle>
          <DialogDescription>select category and weightage for this question</DialogDescription>

          {/* <QAPopUp handleOpen={handleOpen} handleData={handleAddData} datas={data.datas} /> */}
          <AdminQADialogContent
            question={question}
            mark={mark}
            setCategoryId={setCategoryId}
            setMark={setMark}
            setQuestion={setQuestion}
            categoryId={categoryId}
          />

          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button type="submit" className="mt-4" variant="dark" isLoading={isLoading}>
                Add
              </Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddAdminQADialog;
