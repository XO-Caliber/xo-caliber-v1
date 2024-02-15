import Header from "@/components/Header";
import { Button } from "@/components/ui/Button";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getAuthSession();
  return (
    <div>
      <div>
        <Header>Home</Header>
        <div className="flex  flex-col items-center pt-4 ">
          <Button variant={"primary"}>login</Button>
          <Button variant={"secondary"}>signup</Button>
          <h1>{session?.user.role}</h1>
          <h1>{session?.user.email}</h1>
        </div>
      </div>
    </div>
  );
}
