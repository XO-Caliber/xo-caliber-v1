import { Button } from "@/components/ui/Button";
import Image from "next/image";
import linkedinLogo from "../../../../public/images/circle-linkedin.svg";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

export const LinkedinAuth = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { toast } = useToast();

  const loginWithGoogle = async () => {
    setIsLoading(true);
    try {
      console.log("Hello from client");
      await signIn("linkedin");
    } catch (error) {
      // toast notification
      toast({
        title: "There was a problem",
        description: "There was a error in logging in with linkedIn",
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
      <Image className="mx-3" src={linkedinLogo} width={20} alt="Google" />
      <p>LinkedIn</p>
    </Button>
  );
};
