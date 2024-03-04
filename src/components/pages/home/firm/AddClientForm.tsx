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
import { CardDescription, CardTitle } from "@/components/ui/Card";

const formSchema = z.object({
  emailAddress: z.string().email()
});

export const AddClientForm = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: ""
    }
  });

  const { mutate: addClient } = trpc.home.addClient.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
        form.reset();
        toast({
          title: "Client created",
          description: "Client was added succesfully"
        });
      }
    },
    onError(err) {
      if (err.data?.code === "NOT_FOUND") {
        toast({
          title: "User does not exist",
          description: "Make them signup",
          variant: "destructive"
        });
      } else if (err.data?.code === "BAD_REQUEST") {
        toast({
          title: "User can be firm/assistant/admin",
          description: "Try on assistant or user",
          variant: "destructive"
        });
      } else if (err.data?.code === "FORBIDDEN") {
        toast({
          title: "User didnt verify their email",
          description: "Make thme verify their email",
          variant: "destructive"
        });
      } else if (err.data?.code === "CONFLICT") {
        toast({
          title: "User may be already under a firm",
          description: "Only works on user",
          variant: "destructive"
        });
      } else if (err.data?.code === "TOO_MANY_REQUESTS") {
        toast({
          title: "Client limit reached",
          description: "Ask admin to increase your client limit"
        });
      } else {
        form.setError("emailAddress", {
          type: "Failed",
          message: "User already exist in assistant table"
        });
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
    console.log({ values });
    // Commented for testing
    try {
      addClient(values.emailAddress);
    } catch (error) {
      console.error("An unknown error occurred during sign-in.");
      alert(`An unknown error occurred: ${error}`);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-2 rounded-lg border-2 bg-white p-8 pl-8"
      >
        <CardTitle>Add Client</CardTitle>
        <CardDescription>Add your client details here</CardDescription>
        <div className="pt-4">
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="firm@gmail.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col pt-4">
          <Button type="submit" variant={"dark"} isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
