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
import { Plus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
interface QAProps {
  refetchData: () => void;
  subHeadingId: string;
}
const AddFirmCheckList = ({ refetchData, subHeadingId }: QAProps) => {
  const [name, setName] = useState("");
  // const [subHeadingId, setSubHeadingId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const { mutate: addSubHeading } = trpc.checklist.addCheckList.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        router.refresh();
        toast({
          title: "Subheading added",
          description: "Successfully added the subheading"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `Try again ${err}`,
        variant: "destructive"
      });
    },
    onSettled() {
      setLoading(false);
      // setSubHeadingId("");
      setName("");
    }
  });

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast({
        title: "Validation Error",
        description: "Please enter a valid question.",
        variant: "destructive"
      });
      return;
    }
    if (subHeadingId === "") {
      toast({
        title: "Validation Error",
        description: "Please select a category",
        variant: "destructive"
      });
      return;
    }
    setLoading(true);
    const data = {
      name,
      checkSubHeadingId: subHeadingId
    };
    addSubHeading(data);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-500 hover:bg-secondary">
          <Plus className="text-secondary-foreground" />
        </li>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Checklist</DialogTitle>
          <DialogDescription>Write a question for your client to answer:</DialogDescription>
          <section className="flex w-[600px] flex-row items-center gap-4">
            <div className="grid w-full gap-1.5 pt-4">
              <Label htmlFor="message-2">Your Question</Label>
              <Textarea
                placeholder="Type your message here."
                id="message-2"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">
                This question will be viewed and answered by all of your clients.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              {/* <Select onValueChange={(value) => setSubHeadingId(value)}>
              
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent className=" ">
                  {subHeadingResult.data &&
                    subHeadingResult.data.map((head) =>
                      head.subHeading.map((head, index) => (
                        <SelectItem key={head.id} value={head.id}>
                          {head.name}
                        </SelectItem>
                      ))
                    )}
                </SelectContent>
              </Select> */}
            </div>
          </section>

          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button type="submit" className="mt-4" variant="primary" isLoading={isLoading}>
                Add Checklist
              </Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddFirmCheckList;
