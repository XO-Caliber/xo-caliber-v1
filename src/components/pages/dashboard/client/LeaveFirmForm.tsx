"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const LeaveFirmForm = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { mutate: leaveFirm } = trpc.leaveFirm.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
        toast({
          title: "Leaved Firm successfully",
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
      <Button variant={"destructive"} isLoading={isLoading} onClick={() => onSubmit()}>
        Leave Firm
      </Button>
    </div>
  );
};

export default LeaveFirmForm;
