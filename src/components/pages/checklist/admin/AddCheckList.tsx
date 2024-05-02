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
import { Input } from "@/components/ui/Input";
interface QAProps {
  refetchData: () => void;
  subHeadingId: string;
}
const AddCheckList = ({ refetchData, subHeadingId }: QAProps) => {
  const [name, setName] = useState("");
  // const [subHeadingId, setSubHeadingId] = useState("");
  const [isLoading, setLoading] = useState(false);
  const router = useRouter();
  const subHeadingResult = trpc.checklist.getSubHeading.useQuery();
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
    <div>
      {" "}
      {/* <li className="flex cursor-pointer items-center justify-center rounded-md border border-dashed border-gray-500 hover:bg-secondary">
        <Plus className="text-secondary-foreground" />
      </li> */}
      <section className="flex  flex-row items-center gap-4">
        <form onSubmit={onSubmit}>
          <div className="flex w-full items-center justify-center gap-1.5 ">
            <Input
              placeholder="Add your checklist here"
              id="message-2"
              className="w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Button type="submit" className="" size={"sm"} isLoading={isLoading}>
              <Plus size={16} />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddCheckList;
