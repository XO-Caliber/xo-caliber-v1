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

const formSchema = z.object({
  emailAddress: z.string().email(),
  password: z.string().min(3)
});

export const LoginBox = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      emailAddress: "",
      password: ""
    }
  });

  const handleSubmit = () => {};

  return (
    <Card className="w-[500px] z-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <CardHeader>
            <CardTitle>Individual Login</CardTitle>
            <CardDescription>Enter your email & password to login</CardDescription>
          </CardHeader>
          <div className="flex justify-between items-center px-4 w-full">
            <Button className="w-full mx-2" variant={"outline"} size={"lg"}>
              <Image className="mx-3" src={googleLogo} width={14} alt="Google" />
              <p className="text-md">Google</p>
            </Button>
            <Button className="w-full mx-2" variant={"outline"} size={"lg"}>
              <Image className="mx-3" src={linkedinLogo} width={20} alt="Google" />
              <p>LinkedIn</p>
            </Button>
          </div>
          <div className="flex items-center px-6 py-1">
            <div className="border-t border-muted w-full my-4"></div>
            <p className="mx-4 whitespace-nowrap text-muted text-xs">OR CONTINUE WITH</p>
            <div className="border-t border-muted w-full my-4"></div>
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
            <Button className="w-full mx-2" variant={"secondary"}>
              Cancel
            </Button>
            <button
              type="submit"
              className="bg-[#F7654B] w-full py-2 font-medium text-white rounded-md mx-2"
            >
              Login
            </button>
            {/* <Button type="submit" variant={"primary"}>
              Sumbit
            </Button> */}
          </CardFooter>
        </form>
      </Form>
    </Card>
  );
};
