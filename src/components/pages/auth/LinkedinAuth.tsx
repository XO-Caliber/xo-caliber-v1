import { Button } from "@/components/ui/Button";
import Image from "next/image";
import linkedinLogo from "../../../../public/images/circle-linkedin.svg";

export const LinkedinAuth = () => {
  return (
    <Button className="mx-2 w-full" variant={"outline"} size={"lg"}>
      <Image className="mx-3" src={linkedinLogo} width={20} alt="Google" />
      <p>LinkedIn</p>
    </Button>
  );
};
