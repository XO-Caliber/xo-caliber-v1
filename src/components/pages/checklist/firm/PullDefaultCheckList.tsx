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
  const [isLoading, setLoading] = useState(false);
  const { mutate: pullDefaultCheckList } = trpc.checklist.importDefaultCheckList.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "Default Check List Imported",
          description: "Wait for 5 mins to see changes"
        });
      }
    },
    onSettled() {
      setLoading(false);
    }
  });
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    try {
      pullDefaultCheckList();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"dark"}>Pull Default Checklist</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>Pull Default Checklist</DialogHeader>
          <DialogDescription className="text-destructive">
            If you pull default checklists,then you and your client will lose the data,So please be
            mindful.Do you like to proceed
          </DialogDescription>
          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button variant={"dark"} onClick={() => setLoading(true)} isLoading={isLoading}>
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
