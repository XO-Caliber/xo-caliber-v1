"use client";
import { Button } from "@/components/ui/Button";
import Image from "next/image";
import googleLogo from "../../../../public/images/google-logo.svg";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export const GoogleAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      console.log("Hello from client");
      await signIn("google");
    } catch (error) {
      // toast notification
      toast({
        title: "There was a problem",
        description: "There was a error in logging in with google",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      className="mx-2 w-full"
      variant={"outline"}
      size={"lg"}
      onClick={loginWithGoogle}
      isLoading={isLoading}
      type="reset"
    >
      <Image className="mx-3" src={googleLogo} width={14} alt="Google" />
      <p className="text-md">Google</p>
    </Button>
  );
};
