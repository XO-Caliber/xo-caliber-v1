"use client";
import { SessionProvider } from "next-auth/react";

import { PropsWithChildren } from "react";

export const NextAuthProvider = ({ children }: PropsWithChildren) => {
  return <SessionProvider refetchInterval={60}>{children}</SessionProvider>;
};
