"use client";
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
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

const ImportAdmin = () => {
  const [isLoading, setLoading] = useState(false);
  const { mutate: importAdmin } = trpc.question.importAdminQuestions.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "Imported successfully"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong"
      });
    },
    onSettled() {
      setLoading(false);
    }
  });
  const onSubmit = () => {
    try {
      setLoading(true);
      importAdmin();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant={"dark"}
            className=" border-dashed border-gray-400 hover:border"
            size={"sm"}
            // onClick={handleCategoryPopOpen}
          >
            Pull Default Questions
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Pull Default Questions</DialogTitle>
          </DialogHeader>
          <DialogDescription className="text-red-600">
            If you pull default questions,then your questions will be overwritten,Export your
            questions before this action
          </DialogDescription>
          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button variant={"primary"} isLoading={isLoading}>
                Yes,continue
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ImportAdmin;
