"use client";
import { trpc } from "@/app/_trpc/client";
import { ChangePasswordForm } from "@/components/pages/auth/ChangePasswordForm";
import ResetPasswordPage from "@/components/pages/auth/ResetPassword";
import { Button } from "@/components/ui/Button";
import { XCircle } from "lucide-react";
import Link from "next/link";

interface ResetPasswordProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = ({ searchParams }: ResetPasswordProps) => {
  if (searchParams.token) {
    const result = trpc.auth.verifyPasswordToken.useQuery(
      searchParams.token as unknown as void | undefined
    );

    // Check if the user exists
    if (result.data?.success) {
      return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    } else {
      // If the user does not exist, return an error message
      return (
        <section
          className="absolute left-0 top-0 flex h-full w-full
        items-center justify-center overflow-hidden
        bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
        >
          <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
            <XCircle size={150} color="red" className="mb-10" />
            <h1 className="mb-10 text-3xl font-bold">Invalid token</h1>
            <Button variant={"dark"}>
              <Link href={"/login"}>Go to Login</Link>
            </Button>
          </div>
        </section>
      );
    }
  } else {
    return <ResetPasswordPage />;
  }
};

export default page;
