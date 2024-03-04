"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import {
  Dialog,
  DialogHeader,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogDescription
} from "../ui/Dialog";
import { Input } from "../ui/Input";
import { Button } from "@/components/ui/Button";
import { trpc } from "@/app/_trpc/client";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/Form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { CardTitle } from "../ui/Card";
import { Loader, LoaderIcon, RotateCcw } from "lucide-react";

interface userProfile {
  name: string | null | undefined;
  email: string;
  image?: string | undefined | null;
  userCount: number | undefined | null;
  refetchData: () => void;
}

export const GetFirmProfile = ({ name, email, image, userCount, refetchData }: userProfile) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();
  const formSchema = z.object({
    count: z.string()
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      count: ""
    }
  });
  const { mutate: changeClientCount } = trpc.home.changeClientCount.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        form.reset();
        router.refresh();
        toast({
          title: "Client limit changed",
          description: "Firm's client limit changed"
        });
      }
    },
    onError(err) {
      toast({
        title: "CONFLICT",
        description: "Try a new value",
        variant: "destructive"
      });
    },
    onSettled() {
      setIsLoading(false);
    }
  });
  const onSubmit = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    const newvalue = { ...values, count: parseInt(values.count, 10), email };
    try {
      changeClientCount(newvalue);
    } catch (error) {
      console.error("An unknown error occurred during sign-in.");
      alert(`An unknown error occurred: ${error}`);
    }
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex cursor-pointer items-center  rounded-md p-2 text-black hover:bg-secondary">
          <Avatar className="left h-9 w-9">
            <AvatarImage src={image || ""} alt="profile" />
            <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback>
          </Avatar>
          <ul className="overflow-hidden text-ellipsis pl-4">
            <li className="text-sm font-medium">{name}</li>
            <li className="text-sm text-muted">{email}</li>
          </ul>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Firm Profile</DialogTitle>
          <DialogDescription>All the details of users</DialogDescription>
        </DialogHeader>
        <div className="flex cursor-pointer items-center  rounded-md bg-secondary p-2 text-black">
          <Avatar className="left h-9 w-9">
            <AvatarImage src={image || ""} alt="profile" />
            <AvatarFallback>{name ? name.slice(0, 2).toUpperCase() : null}</AvatarFallback>
          </Avatar>
          <ul className="overflow-hidden text-ellipsis pl-4">
            <li className="text-sm font-medium">{name}</li>
            <li className="text-sm text-muted">{email}</li>
          </ul>
          <div className="ml-32 text-[13px] font-bold">Client Limit: {userCount}</div>
        </div>
        <CardTitle className="text-md">Change Client Limit</CardTitle>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="flex">
              <FormField
                control={form.control}
                name="count"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Enter the count" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button variant={"primary"} className="ml-8" size={"default"} isLoading={isLoading}>
                Change
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
