"use client";
import { trpc } from "@/app/_trpc/client";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusSquare } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddCoverLetterDialog = ({ userId }: { userId: string }) => {
  const [loading, setLoading] = useState(false);

  const formSchema = z.object({
    title: z.string().min(2, {
      message: "Title must be at least 2 characters."
    })
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ""
    }
  });

  const { mutate: addCategory } = trpc.coverletter.addAdminCoverLetter.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "Cover Letter Added",
          description: "Successfully added new cover letter"
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
    }
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const title = values.title;
    addCategory({ userId, title });
    setLoading(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"dark"}>
          <PlusSquare size={16} className="mr-2" />
          Add Cover Letter
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>Add Cover Letter</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Case Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Case name..." {...field} />
                    </FormControl>
                    <FormDescription>This is your public display name.</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-between">
                <DialogClose>
                  <Button>Close</Button>
                </DialogClose>
                <Button variant={"primary"} isLoading={loading} type="submit">
                  Submit
                </Button>
              </div>
            </form>
          </Form>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default AddCoverLetterDialog;