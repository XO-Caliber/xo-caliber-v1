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
import { Checkbox } from "@/components/ui/Checkbox";
import Link from "next/link";
import { trpc } from "@/app/_trpc/client";

const formSchema = z
  .object({
    emailAddress: z.string().email(),
    password: z.string().min(3),
    passwordConfirm: z.string()
  })
  .refine(
    (data) => {
      return data.password === data.passwordConfirm;
    },
    {
      message: "Password do not match",
      path: ["passwordConfirm"]
    }
  );

export const SignupBox = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: "",
      passwordConfirm: ""
    }
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    console.log({ values });
  };

  const { data } = trpc.test.useQuery;

  return (
    <Card className="z-50 w-[500px]">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Sign Up</CardTitle>
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
            <div className="flex items-center space-x-2 pt-3">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Accept terms and conditions
              </label>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between ">
            <Button className="w-full" variant={"secondary"}>
              Cancel
            </Button>
            <button
              type="submit"
              className="mx-2 w-full rounded-md bg-[#F7654B] py-2 font-medium text-white"
            >
              Create account
            </button>
            {/* <Button type="submit" variant={"primary"}>
              Sumbit
            </Button> */}
          </CardFooter>
          <div className="flex w-full justify-between px-6 pb-6">
            <p>
              Have an account already?
              <Link className="pl-1 text-primary underline underline-offset-2" href={"/signup"}>
                Log In
              </Link>
            </p>
          </div>
        </form>
      </Form>
    </Card>
  );
};
