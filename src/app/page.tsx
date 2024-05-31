import { redirect } from "next/navigation";
import { getAuthSession } from "./api/auth/[...nextauth]/authOptions";

export default async function Home() {
  const session = await getAuthSession();

  // Redirect to /login if there is no session
  if (!session) {
    redirect("/login");
    return null;
  }
  if (session) {
    redirect("/home_page");
  }

  return <div>{/* Render your authenticated home page here */}</div>;
}
