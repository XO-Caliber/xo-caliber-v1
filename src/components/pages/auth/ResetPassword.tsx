"use client";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { trpc } from "@/app/_trpc/client";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../../public/images/LOGO_Trans.png";

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const { mutate: resetpassword } = trpc.resetPassword.useMutation({
    onSuccess() {
      setMessage("Password reset is sent to your email");
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") {
        setMessage("User does not exist");
      }
    }
  });

  const handleResetPassword = async () => {
    try {
      setIsLoading(true);
      resetpassword({ email });
      // You might want to navigate the user or show a success message here
    } catch (error) {
      console.error("Password reset request failed", error);
      setMessage("Password reset request failed");
      // Handle the error, show an error message, etc.
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="absolute left-0 top-0 h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-rose-200 to-white
                "
    >
      <Link href={"/"}>
        <Image className="absolute m-4" priority src={logo} alt="Logo" width={250} height={200} />
      </Link>
      <div className="flex min-h-screen items-center justify-center">
        <div className="rounded-md bg-white p-8 shadow-md">
          <h1 className="mb-4 text-2xl font-bold">Reset Password Page</h1>

          {/* Email input */}
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Email:</label>
            <input
              type="email"
              className="mt-1 w-full rounded-md border border-gray-300 p-2"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <Button variant={"primary"} onClick={handleResetPassword} isLoading={isLoading}>
            Reset Password
          </Button>

          {/* Display message */}
          {message && <div className="mt-4 text-sm text-gray-600">{message}</div>}
        </div>
      </div>
    </section>
  );
};

export default ResetPasswordPage;
