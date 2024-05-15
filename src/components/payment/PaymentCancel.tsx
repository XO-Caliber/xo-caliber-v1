import React from "react";
import { Button } from "../ui/Button";
import { trpc } from "@/app/_trpc/client";

const PaymentCancel = () => {
  const cancelSubCall = trpc.payment.cancelSubscription.useMutation();

  const cancelSubscription = () => {
    cancelSubCall.isSuccess;
  };

  return (
    <Button variant={"destructive"} onClick={cancelSubscription}>
      Cancel Subscription
    </Button>
  );
};

export default PaymentCancel;
