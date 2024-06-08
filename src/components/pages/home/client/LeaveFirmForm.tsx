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
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface LeaveFirmProps {
  refetchData: () => void;
}
const LeaveFirmForm = ({ refetchData }: LeaveFirmProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: leaveFirm } = trpc.home.leaveFirm.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        router.refresh();
        toast({
          title: "Left Firm successfully",
          description: "Sucess"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err.data}`
      });
    },
    onSettled() {
      setIsLoading(false);
    }
  });

  const onSubmit = () => {
    leaveFirm();
  };

  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"destructive"} isLoading={isLoading}>
            Leave Firm
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Leave Firm</DialogTitle>
            <DialogDescription>Do you want to really leave this firm</DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button type="submit" onClick={() => onSubmit()}>
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LeaveFirmForm;
