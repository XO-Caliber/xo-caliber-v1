import React, { useState } from "react";
import { Button } from "../ui/Button";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

const PaymentCancel = () => {
  const [loading, setLoading] = useState(false);

  const { mutate: cancelSubscription } = trpc.payment.cancelSubscription.useMutation({
    onSuccess({ success }) {
      setLoading(false); // Reset loading state
      if (success) {
        toast({
          title: "Subscription canceled successfully",
          description:
            "Your subscription has been successfully canceled, but you can continue to use it until the expiration date."
        });
      }
    },
    onError(err) {
      setLoading(false); // Reset loading state
      console.log(err);
      toast({
        title: "Something went wrong!",
        description: `Error: ${err}`
      });
    }
  });

  const handleCancelSubscription = () => {
    setLoading(true); // Set loading state to true
    try {
      cancelSubscription();
    } catch (err) {
      setLoading(false); // Reset loading state in case of error
      console.log(err);
    }
  };

  return (
    <Button
      variant={"destructive"}
      onClick={handleCancelSubscription}
      disabled={loading}
      isLoading={loading}
    >
      {loading ? "Canceling..." : "Cancel Subscription"}
    </Button>
  );
};

export default PaymentCancel;
