"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/Dialog";
import { toast } from "@/hooks/use-toast";
import React, { useState } from "react";

const PullDefaultCheckList = ({ refetchData }: { refetchData: () => void }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const { mutate: pullDefaultCheckList } = trpc.checklist.importDefaultCheckList.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "Default Check List Imported",
          description: "Wait for 5 mins to see changes"
        });
      }
    }
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      pullDefaultCheckList();
      setDialogOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog open={dialogOpen}>
        <DialogTrigger asChild>
          <Button onClick={() => setDialogOpen(true)}>Pull Default Checklist</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Pull Default CHecklist</DialogHeader>
          <DialogDescription className="text-destructive">
            If you pull default checklist,then your checklist will be overwritten,Do you want to
            continue
          </DialogDescription>
          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button variant={"dark"} isLoading={!dialogOpen}>
                Yes,continue
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PullDefaultCheckList;
