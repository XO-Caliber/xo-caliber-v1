import { Button } from "@/components/ui/Button";

import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="ml-56 h-screen">
        <div className="h-[65px] border-2 border-l-0"></div>
        <div className="flex min-h-screen flex-col items-center p-24 ">
          <Button variant={"primary"}>login</Button>
          <Button variant={"secondary"}>signup</Button>
        </div>
      </div>
    </div>
  );
}
