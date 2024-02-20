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
            className="ml-4 border-dashed border-gray-400 hover:border"
            size={"sm"}
            // onClick={handleCategoryPopOpen}
          >
            Import Default Questions
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Import Default Questions</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            If you import admin questions your existing questions will overwrite,Do you want to
            continue
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
