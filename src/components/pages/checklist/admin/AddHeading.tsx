"use client";
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
import { PlusSquare, X } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
interface headingProps {
  refetchData: () => void;
}
const AddHeading = ({ refetchData }: headingProps) => {
  const router = useRouter();
  const [heading, setheading] = useState("");
  const [isLoading, setLoading] = useState(false);
  const headingResult = trpc.checklist.getHeading.useQuery();

  const { mutate: deleteheading } = trpc.checklist.deleteHeading.useMutation({
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

  const { mutate: addheading } = trpc.checklist.addHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        headingResult.refetch();
        toast({
          title: "heading Added",
          description: "Successfully added the heading"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      setLoading(false);
      setheading("");
    }
  });

  const onSubmit = () => {
    try {
      if (!heading.trim()) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid heading.",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      addheading(heading);
    } catch (err) {
      console.log("Something went wrong");
    }
  };

  return (
    <Dialog onOpenChange={() => setheading("")}>
      <DialogTrigger asChild>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 hover:border"
          size={"sm"}
          // onClick={handleheadingPopOpen}
        >
          <p className="ml-2">Add Topic</p>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mt-4">
          {/* 
          <headingPopUp
            handleheadingPopOpen={handleheadingPopOpen}
            createheading={createheading}
          /> */}
          <Input placeholder="New Topic" onChange={(e) => setheading(e.target.value)} />
          {/* {headingResult.data && (
            <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
              {headingResult.data.map((heading, index) => (
                <li
                  key={heading.id}
                  className={`flex w-fit items-center justify-center 
                  rounded-md border p-1 px-3 text-sm ${
                    index % 2 === 0
                      ? "border-primary bg-primary-light"
                      : "border-muted bg-secondary"
                  }`}
                >
                  {heading.name}
                  <X
                    className="ml-1 cursor-pointer text-primary"
                    size={16}
                    onClick={() => deleteheading(heading.id)}
                  />
                </li>
              ))}
            </ul>
          )} */}

          <DialogFooter>
            <Button
              type="submit"
              className="mt-4"
              variant="dark"
              isLoading={isLoading}
              onClick={onSubmit}
            >
              Add
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddHeading;
