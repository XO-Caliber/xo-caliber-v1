import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div className="flex min-h-screen flex-col items-center p-24 ">
      <Button variant={"primary"}>login</Button>
      <Button variant={"secondary"}>signup</Button>
      <h1>{session?.user?.name}</h1>
      <h1>{session?.user?.email}</h1>
      <h1>{session?.user.role}</h1>
    </div>
  );
}
