"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CardTitle } from "@/components/ui/Card";

const formSchema = z.object({
  emailAddress: z.string().email()
});

export const AddFirmForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: ""
    }
  });

  const { mutate: addfirm } = trpc.home.addFirm.useMutation({
    onSuccess({ success }) {
      if (success) {
        //Login user here
        router.refresh();
        form.reset();
        toast({
          title: "Firm created",
          description: "User upgraded to firm successfully"
        });
      }
    },
    onError(err) {
      if (err.data?.code === "NOT_FOUND") {
        toast({
          title: "User does not exist",
          description: "Signup them",
          variant: "destructive"
        });
      } else if (err.data?.code === "BAD_REQUEST") {
        toast({
          title: "User already a firm or assistant",
          description: "Only works on user",
          variant: "destructive"
        });
      } else if (err.data?.code === "FORBIDDEN") {
        toast({
          title: "User didnt verify their email",
          description: "Make them verify their email",
          variant: "destructive"
        });
      } else if (err.data?.code === "CONFLICT") {
        toast({
          title: "User already exist in firm table",
          description: "Only works on user",
          variant: "destructive"
        });
      } else if (err.data?.code === "METHOD_NOT_SUPPORTED") {
        toast({
          title: "User may be a client",
          description: "Cant add a client as a firm"
        });
      } else {
        toast({
          title: "Something went wrong",
          description: `Error:  ${err.data}`,
          variant: "destructive"
        });
      }
    },
    onSettled() {
      // This block will be executed regardless of success or error
      setIsLoading(false);
    }
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    // Commented for testing
    try {
      addfirm(values.emailAddress);
    } catch (error) {
      console.error("An unknown error occurred during sign-in.");
      alert(`An unknown error occurred: ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-2 rounded-lg border-2 bg-secondary p-8"
      >
        <CardTitle>Add Firm</CardTitle>

        <div className="pt-5">
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel></FormLabel>
                <FormControl>
                  <Input placeholder="Add Email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className=" item-end flex justify-end pb-3 pt-5">
          <Button type="submit" variant={"dark"} isLoading={isLoading}>
            Add
          </Button>
        </div>
      </form>
    </Form>
  );
};
