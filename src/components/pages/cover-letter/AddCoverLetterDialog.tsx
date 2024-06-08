"use client";
import { trpc } from "@/app/_trpc/client";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Button } from "@/components/ui/Button";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { toast } from "@/hooks/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const AddCoverLetterDialog = ({
  userId,
  role,
  refetchCaseData
}: {
  userId: string;
  role: string;
  refetchCaseData: () => void;
}) => {
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

  const { mutate: addCategory } = trpc.coverletter.addCoverLetter.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchCaseData();
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
    const title = values.title;
    addCategory({ userId, title, role: role });
    setLoading(true);
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"dark"}>Add Cover Letter</Button>
      </DialogTrigger>
      <DialogContent>
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
                      <Input placeholder="New Case" {...field} />
                    </FormControl>
                    {/* <FormDescription>This is your public display name.</FormDescription> */}
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className=" flex justify-between">
                <DialogClose>
                  <Button type="reset">Close</Button>
                </DialogClose>
                <Button variant={"dark"} isLoading={loading} type="submit">
                  Add
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
