"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/Form";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/Toast";
import { user } from "@/types/user";
import { GoogleAuth } from "./GoogleAuth";
import { LinkedinAuth } from "./LinkedinAuth";
import { useState } from "react";

const formSchema = user.refine(
  (data) => {
    return data.password === data.passwordConfirm;
  },
  {
    message: "Passwords do not match",
    path: ["passwordConfirm"]
  }
);

export const SignupBox = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      emailAddress: "",
      password: "",
      passwordConfirm: ""
    }
  });
  const { mutate: registerUser } = trpc.auth.register.useMutation({
    onSuccess({ success }) {
      console.log("User created successfully");
      if (success) {
        //Login user here
        router.push("/login");
        router.refresh();
        toast({
          title: "Registered successfully",
          description: "Please verify your email and login"
        });
      }
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") {
        toast({
          title: "User already exist",
          description: "Please login",
          variant: "destructive",
          action: (
            <ToastAction altText="Login">
              <Link href={"/login"}>Login</Link>
            </ToastAction>
          )
        });
        console.log("User exist");
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

  const handleSignup = (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    console.log({ values });
    // Commented for testing
    try {
      registerUser(values);
    } catch (error) {
      console.error("An unknown error occurred during sign-in.");
      alert(`An unknown error occurred: ${error}`);
    }
  };

  return (
    <Card className="z-50 w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSignup)}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
            <CardDescription>Enter your email & password to login</CardDescription>
          </CardHeader>
          <div className="flex w-full items-center justify-between px-4">
            <GoogleAuth />
            <LinkedinAuth />
          </div>
          <div className="flex items-center px-6 py-1">
            <div className="my-4 w-full border-t border-muted"></div>
            <p className="mx-4 whitespace-nowrap text-xs text-muted">OR CONTINUE WITH</p>
            <div className="my-4 w-full border-t border-muted"></div>
          </div>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="emailAddress"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email address" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password </FormLabel>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password confirm</FormLabel>
                    <FormControl>
                      <Input placeholder="Password confirm" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />
            {/* Terms and conditions checkbox implement if wanted, IT GIVES SOME BUGS!! 
            <div className="flex items-center space-x-2 pt-3">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div> */}
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Link href={"/"} className="w-full">
              <Button type="reset" className="w-full" variant={"secondary"}>
                Cancel
              </Button>
            </Link>
            {/* <button
              type="submit"
              className="mx-2 w-full rounded-md bg-[#F7654B] py-2 font-medium text-white"
            >
              Create account
            </button> */}
            <Button type="submit" variant={"color"} isLoading={isLoading}>
              Submit
            </Button>
          </CardFooter>
          <div className="flex w-full justify-between px-6 pb-6">
            <p>
              Have an account already?
              <Link className="pl-1 text-primary underline underline-offset-2" href={"/login"}>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
};
