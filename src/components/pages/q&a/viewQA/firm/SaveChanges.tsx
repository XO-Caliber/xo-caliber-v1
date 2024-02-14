"use client";
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
import { Button } from "@/components/ui/Button";
import { AlertTriangle } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

const SaveChanges = () => {
  const [loading, setLoading] = useState(false);
  const { mutate: saveChanges } = trpc.answer.saveChanges.useMutation({
    onSuccess(success) {
      if (success) {
        toast({
          title: "Saved Changes successfullhy"
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
      saveChanges();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"primary"} className="ml-4 " size={"sm"}>
          Save Changes
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Save Changes to Clients</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <div className="flex items-center justify-center">
            <AlertTriangle color="red" />
            This will erase all of your client answers and they need to answer from scratch.
          </div>
        </DialogDescription>
        <DialogFooter>
          <form onSubmit={onSubmit}>
            <Button variant={"primary"} isLoading={loading}>
              Yes,continue
            </Button>
          </form>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SaveChanges;
