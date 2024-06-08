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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/Toast";
import { user } from "@/types/user";
import { GoogleAuth } from "./GoogleAuth";
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
  const TermsAndPrivacyLinks = () => (
    <>
      <Link
        className="px-1 text-[#333] underline underline-offset-2"
        href="https://xocaliber.tech/privacy-policy/"
      >
        Privacy Policy
      </Link>
      &nbsp;
      <Link
        className="pl-1 text-[#333] underline underline-offset-2"
        href="https://xocaliber.tech/tc/"
      >
        Terms and Conditions
      </Link>
    </>
  );
  const { mutate: registerUser } = trpc.auth.register.useMutation({
    onSuccess({ success }) {
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
          <CardHeader className="flex items-center justify-center">
            <CardTitle>Seconds to Sign Up !</CardTitle>
          </CardHeader>
          <div className="flex w-full items-center justify-between px-4">
            <GoogleAuth />
            {/* <LinkedinAuth /> */}
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
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button type="submit" variant={"color"} isLoading={isLoading}>
              Start your journey
            </Button>
          </CardFooter>
          <div className="flex w-full flex-row justify-between px-6 pb-6 text-xs text-black">
            <p className="flex flex-col items-center justify-start">
              <div>
                <p>
                  By clicking the button above,you agree to our{" "}
                  <Link
                    className="px-1 text-black underline underline-offset-2"
                    href={"https://xocaliber.tech/privacy-policy/"}
                  >
                    Privacy Policy
                  </Link>
                  &
                  <Link
                    className="pl-1 text-black underline underline-offset-2"
                    href={"https://xocaliber.tech/tc/"}
                  >
                    T&C.
                  </Link>
                  <Link
                    className="pl-1 text-black underline underline-offset-2"
                    href={"https://xocaliber.tech/disclaimer/"}
                  >
                    Read our disclaimer
                  </Link>
                </p>
              </div>
            </p>
          </div>
          <div className="flex w-full justify-between px-6 pb-6">
            <p>
              Have an account already?
              <Link className="pl-1 text-[#63156A] underline underline-offset-2" href={"/login"}>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
};
