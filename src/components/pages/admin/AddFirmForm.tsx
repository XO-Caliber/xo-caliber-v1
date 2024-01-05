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

  const { mutate: addfirm } = trpc.addFirm.useMutation({
    onSuccess({ success }) {
      console.log("User created successfully");
      if (success) {
        //Login user here
        router.refresh();
        toast({
          title: "Upgraded user successfully",
          description: "firm created"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `Error:  ${err.data}`,
        variant: "destructive"
      });
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 ">
        <FormField
          control={form.control}
          name="emailAddress"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormDescription>By this you will promote and user to firm</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" variant="primary" isLoading={isLoading}>
          Submit
        </Button>
      </form>
    </Form>
  );
};
