"use client";
import { trpc } from "@/app/_trpc/client";
import { ChangePasswordForm } from "@/components/pages/auth/ChangePasswordForm";
import ResetPasswordPage from "@/components/pages/auth/ResetPassword";

interface ResetPasswordProps {
  searchParams: { [key: string]: string | string[] | undefined };
}

const page = ({ searchParams }: ResetPasswordProps) => {
  if (searchParams.token) {
    const result = trpc.verifyPasswordToken.useQuery(
      searchParams.token as unknown as void | undefined
    );

    // Check if the user exists
    if (result.data?.success) {
      return <ChangePasswordForm resetPasswordToken={searchParams.token as string} />;
    } else {
      // If the user does not exist, return an error message
      return <div>Invalid token</div>;
    }
  } else {
    return <ResetPasswordPage />;
  }
};

export default page;
