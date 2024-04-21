import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { trpc } from "../_trpc/client";

export const page = () => {
  const router = useRouter();
  const sessionId = useRouter().query.session_id as string;

  const session = trpc.payment.getStripeSession.useQuery(
    { sessionId },
    {
      enabled: router.isReady
    }
  );

  useEffect(() => {
    if (session.data?.email) {
      router.push(`/course?email=${session.data.email}`).catch(console.error);
    }
  }, [session.data, router]);

  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center">
        Validating payment...
      </main>
    </>
  );
};
