// ChangePasswordForm.tsx
"use client";
import { changePassword } from "@/app/actions/users/changePassword";
import React, { useState } from "react";

interface ChangePasswordFormProps {
  resetPasswordToken: string;
}

export const ChangePasswordForm = ({ resetPasswordToken }: ChangePasswordFormProps) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle password change logic here
    console.log("Password:", password);
    console.log("Confirm Password:", confirmPassword);
    const message = await changePassword(resetPasswordToken, password);
  };

  return (
    <section
      className="absolute left-0 top-0 h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-rose-200 to-white
                "
    >
      <div className="mx-auto mt-8 max-w-md rounded-md bg-white p-6 shadow-md">
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
              className="absolute inset-y-0 right-0 flex items-center pr-3 focus:outline-none"
            >
              <svg
                className="h-5 w-5 cursor-pointer text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {showPassword ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  ></path>
                ) : (
                  <>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    ></path>
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M2 12s3 9 10 9 10-9 10-9"
                    ></path>
                  </>
                )}
              </svg>
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
          </div>
          <button
            type="submit"
            className="w-full rounded bg-blue-500 p-3 text-white hover:bg-blue-600 focus:border-blue-700 focus:outline-none focus:ring focus:ring-blue-200"
          >
            Change Password
          </button>
        </form>
      </div>
    </section>
  );
};
