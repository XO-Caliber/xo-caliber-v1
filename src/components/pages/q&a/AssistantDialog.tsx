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
import { Label } from "@/components/ui/Label";
import AssistantSelectList from "@/components/utils/AssistantSelectList";
import UserSelectList from "@/components/utils/UserSelectList";
import { toast } from "@/hooks/use-toast";
import { UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export const AssistantDialog = () => {
  const router = useRouter();
  const [user, setUser] = useState("");
  const [assistant, setAssistant] = useState("");
  const [isLoading, setLoading] = useState(false);
  function getSelectedUser(userData: string) {
    setUser(userData);
  }
  function getSelectedAssistant(assistantData: string) {
    setAssistant(assistantData);
  }
  const { mutate: assignAssistant } = trpc.assignAssistant.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
        toast({
          title: "Assigned Successfully",
          description: "Assigned assistant for the user"
        });
      }
    },
    onError(err) {
      toast({
        title: "Somrthing went wrong",
        description: "Try again later",
        variant: "destructive"
      });
    },
    onSettled() {
      setLoading(false);
    }
  });
  const onSubmit = () => {
    console.log(user, assistant);
    try {
      setLoading(true);
      assignAssistant({ user, assistant });
      console.log("Assigned successfully");
    } catch (err) {
      console.log("Somthing went wrong");
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="ml-4 border-gray-400 font-medium hover:border"
          // onClick={handleOpen}
          size={"sm"}
        >
          <UserPlus size={16} />
          <p className="ml-2">Assign Assistant</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add assistant to this user</DialogTitle>
          <DialogDescription>Select an assistant from the below list:</DialogDescription>
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between py-4">
              <Label htmlFor="name" className="text-right">
                For User:
              </Label>
              {/* <Input id="name" defaultValue="Pedro Duarte" className="col-span-3" /> */}
              <UserSelectList getSelectedUser={getSelectedUser} />
            </div>
            <div className="flex w-full items-center justify-between py-4">
              <Label htmlFor="username" className="text-right">
                Assign Assistant:
              </Label>
              {/* <Input id="username" defaultValue="@peduarte" className="col-span-3" /> */}
              <AssistantSelectList getSelectedAssistant={getSelectedAssistant} />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="mt-4"
              variant="primary"
              onClick={onSubmit}
              isLoading={isLoading}
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
