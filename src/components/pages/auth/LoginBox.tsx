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
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/Toast";
import { GoogleAuth } from "./GoogleAuth";
import { useState } from "react";
import { InfoIcon } from "lucide-react";

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(5),
  type: z.string()
});

export const LoginBox = () => {
  const router = useRouter();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      type: "individual"
    }
  });

  const loginUser = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        ...data,
        redirect: false
      });

      if (result?.ok) {
        setIsLoading(false);
        router.push("/home_page");
        router.refresh();
        toast({
          title: "Logged In successfully",
          description: "Please wait",
          variant: "success"
        });
      } else if (result?.error === "user does not exist") {
        setIsLoading(false);
        toast({
          title: "User does not exist",
          description: "Please Sign Up",
          variant: "destructive",
          action: (
            <ToastAction altText="Signup">
              <Link href={"/signup"}>Sign Up</Link>
            </ToastAction>
          )
        });
      } else {
        setIsLoading(false);
        console.error("Sign-in failed");
        toast({
          title: "Sign In failed",
          description: `${result?.error}`,
          variant: "destructive"
        });
        // alert(`Sign-in failed: ${result?.error}`);
      }
    } catch (error) {
      console.error("An unknown error occurred during sign-in.");
      alert(`An unknown error occurred: ${error}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (values: z.infer<typeof formSchema>) => {
    loginUser(values);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="z-50 w-[500px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleLogin)}>
            <CardHeader className="flex items-center justify-center">
              <CardTitle>Welcome back !</CardTitle>
            </CardHeader>
            <div className="flex w-full items-center justify-between px-4">
              <GoogleAuth />

              <span
                title=" This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of
                    Service apply."
              >
                <InfoIcon className="cursor-pointer" />
              </span>

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
              <Button type="submit" variant={"color"} isLoading={isLoading}>
                Resume your journey
              </Button>
            </CardFooter>
            <div className="flex w-full justify-between px-6 pb-6">
              <p>
                Dont have an account?
                <Link className="pl-1 text-[#63156A] underline underline-offset-2" href={"/signup"}>
                  Sign Up
                </Link>
              </p>
              <Link className="mr-2 text-[#63156A]" href={"/reset-password"}>
                Reset password
              </Link>
            </div>
          </form>
        </Form>
      </Card>
    </div>
  );
};
