// ChangePasswordForm.tsx
"use client";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

export const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const { mutate: changePassword } = trpc.auth.changePassword.useMutation({
    onSuccess() {
      setMessage("Password changed successfully");
      router.push("/login");
    },
    onError(err) {
      if (err.data?.code === "UNAUTHORIZED") {
        setMessage("Invalid Token: Token used once");
      } else if (err.data?.code === "BAD_REQUEST") {
        setMessage("Your reset token expired");
      } else if (err.data?.code === "NOT_FOUND") {
        setMessage("Token not found");
      }
    }
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password change logic here
    try {
      const message = changePassword({ resetPasswordToken, password });
    } catch (error) {
      console.error("Error:", error);
      setMessage("Something went wrong!");
    }
  };

  return (
    <section
      className="absolute left-0 top-0 h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-rose-200 to-white
                "
    >
      <div className="mx-auto mt-8 max-w-md rounded-lg border-2 border-border bg-white p-6 shadow-md">
        <h2 className="mb-6 text-2xl font-semibold">Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="relative mb-4">
            <label htmlFor="password" className="mb-2 block text-sm font-bold text-gray-700">
              New Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-3 pr-10"
              placeholder="Enter your new password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 top-6 flex items-center pr-3 focus:outline-none"
            >
              {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
            </button>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-bold text-gray-700">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded border border-gray-300 p-3"
              placeholder="Confirm your new password"
              required
            />
            <p>{message && <div className="mt-4 text-sm text-gray-600">{message}</div>}</p>
          </div>
          <Button type="submit" variant={"dark"} className="w-full">
            Change Password
          </Button>
        </form>
      </div>
    </section>
  );
};
