import { Button } from "@/components/ui/Button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <Button variant={"primary"}>
        <Link href={"/login"}>Log In</Link>
      </Button>
      <Button variant={"secondary"}>
        <Link href={"/signup"}>Sign Up</Link>
      </Button>
    </div>
  );
}
