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
import { PenBox, Plus, PlusSquare } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { trpc } from "@/app/_trpc/client";
import { Label } from "@/components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { Textarea } from "@/components/ui/Textarea";

interface QAProps {
  refetchData: () => void;
  headingId: string;
}

const AddSubHeading = ({ refetchData, headingId }: QAProps) => {
  const [name, setName] = useState("");
  // const [headingId, setHeadingId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const headingResult = trpc.checklist.getHeading.useQuery();
  const subHeadingResult = trpc.checklist.getSubHeading.useQuery();

  const { mutate: deleteSubHeading } = trpc.checklist.deleteSubHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        headingResult.refetch();
        router.refresh();
        toast({
          title: "Deleted heading",
          description: "The heading was deleted successfully"
        });
      }
    },
    onError(err) {
      console.log(err);
    }
  });

  const { mutate: addSubHeading } = trpc.checklist.addSubHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        subHeadingResult.refetch();
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
      // setHeadingId("");
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
    if (headingId === "") {
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
      checkHeadingId: headingId
    };
    addSubHeading(data);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="flex cursor-pointer items-center justify-center rounded-md border border-gray-500 bg-white hover:bg-secondary">
          <Plus className="text-gray-500 text-secondary-foreground" />
        </li>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add SubHeading</DialogTitle>
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
              {/* <Select onValueChange={(value) => setHeadingId(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="select" />
                </SelectTrigger>
                <SelectContent className=" ">
                  {headingResult.data &&
                    headingResult.data.map((head) => (
                      <SelectItem key={head.id} value={head.id}>
                        {head.name}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select> */}
            </div>
          </section>
          <div>
            {subHeadingResult.data && (
              <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
                {subHeadingResult.data.map((heading) =>
                  heading.subHeading.map((sub, index) => (
                    <li
                      key={sub.id} // Use sub.id as the key for each list item
                      className={`flex w-fit items-center justify-center rounded-md border p-1 px-3 text-sm ${
                        index % 2 === 0
                          ? "border-primary bg-primary-light"
                          : "border-muted bg-secondary"
                      }`}
                    >
                      {sub.name}
                      <PenBox
                        className="ml-1 cursor-pointer text-primary"
                        size={16}
                        onClick={() => deleteSubHeading(sub.id)} // Pass sub.id to the deleteSubHeading mutation
                      />
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
          <DialogFooter>
            <form onSubmit={onSubmit}>
              <Button type="submit" className="mt-4" variant="primary" isLoading={isLoading}>
                Add SubHeading
              </Button>
            </form>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddSubHeading;
