"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/Button";
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
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";
import { CardDescription, CardTitle } from "@/components/ui/Card";

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

  const { mutate: addfirm } = trpc.dashboard.addFirm.useMutation({
    onSuccess({ success }) {
      console.log("User created successfully");
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
          description: "Make them signup",
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
          description: "Make thme verify their email",
          variant: "destructive"
        });
      } else if (err.data?.code === "CONFLICT") {
        toast({
          title: "User already exist in firm table",
          description: "Only works on user",
          variant: "destructive"
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
    console.log({ values });
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
        className="w-full space-y-2 rounded-lg border-2 p-8"
      >
        <CardTitle>Make Firm</CardTitle>
        <CardDescription>Add your firm details here</CardDescription>
        <div className="pt-5">
          <FormField
            control={form.control}
            name="emailAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="shadcn" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex w-full flex-col pb-3 pt-5">
          <Button type="submit" variant={"dark"} isLoading={isLoading}>
            Submit
          </Button>
        </div>
      </form>
    </Form>
  );
};
