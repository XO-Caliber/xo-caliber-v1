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
import googleLogo from "../../../../public/images/google-logo.svg";
import linkedinLogo from "../../../../public/images/circle-linkedin.svg";
import Image from "next/image";
import Link from "next/link";
import { SignInResponse, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(5)
});

export const LoginBox = () => {
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: ""
    }
  });

  const loginUser = async (data: z.infer<typeof formSchema>) => {
    console.log("Hello from client");
    const result = await signIn("credentials", {
      ...data,
      redirect: false
    });

    if (result?.ok) {
      router.push("/");
    } else if (result?.error) {
      console.error("Sign-in failed");
    } else {
      console.error("Something went wrong");
    }
  };

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    console.log("Hello from onclick");
    console.log({ values });
    // Commented for testing
    loginUser(values);
  };

  return (
    <Card className="z-50 w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)}>
          <CardHeader>
            <CardTitle>Individual Login</CardTitle>
            <CardDescription>Enter your email & password to login</CardDescription>
          </CardHeader>
          <div className="flex w-full items-center justify-between px-4">
            <Button className="mx-2 w-full" variant={"outline"} size={"lg"}>
              <Image className="mx-3" src={googleLogo} width={14} alt="Google" />
              <p className="text-md">Google</p>
            </Button>
            <Button className="mx-2 w-full" variant={"outline"} size={"lg"}>
              <Image className="mx-3" src={linkedinLogo} width={20} alt="Google" />
              <p>LinkedIn</p>
            </Button>
          </div>
          <div className="flex items-center px-6 py-1">
            <div className="my-4 w-full border-t border-muted"></div>
            <p className="mx-4 whitespace-nowrap text-xs text-muted">OR CONTINUE WITH</p>
            <div className="my-4 w-full border-t border-muted"></div>
          </div>
          <CardContent>
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
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button type="reset" className="w-full" variant={"secondary"}>
              Cancel
            </Button>
            <button
              type="submit"
              className="mx-2 w-full rounded-md bg-[#F7654B] py-2 font-medium text-white"
            >
              Login
            </button>
            {/* <Button type="submit" variant={"primary"}>
              Sumbit
            </Button> */}
          </CardFooter>
          <div className="flex w-full justify-between px-6 pb-6">
            <p>
              Dont have an account?
              <Link className="pl-1 text-primary underline underline-offset-2" href={"/signup"}>
                Sign Up
              </Link>
            </p>
            <Link className="mr-2 text-primary" href={"/signup"}>
              Reset password
            </Link>
          </div>
        </form>
      </Form>
    </Card>
  );
};
