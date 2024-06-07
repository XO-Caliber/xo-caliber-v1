import Image from "next/image";
import mainLogo from "../../public/images/main_logo.png";
import { HomeIcon, Timer, User } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "./ui/Dropdown-menu";
import Logout from "./pages/auth/Logout";
import WorkSpace from "./pages/workspaces/WorkSpace";
import { UserProfile } from "./utils/UserProfile";
import ViewProfile from "./pages/profile/ViewProfile";
import { Dialog, DialogTrigger } from "./ui/Dialog";
import FeedbackForm from "./FeedbackForm";
import InstructionVideoLink from "./InstructionVideoLink";

export const Navbar = async () => {
  const session = await getAuthSession();
  const refLink = session ? "/home_page" : "https://xocaliber.tech/";
  return (
    <nav className="absolute z-50 h-screen w-56 border-r-2 border-border bg-white">
      <Link href={"/"}>
        <div className="flex  items-center justify-center border-b-2 ">
          <Image src={mainLogo} width={220} height={50} className="m-4 w-36" alt="LOGO" />
        </div>
      </Link>
      <ul className="p-2">
        {/* <li className="relative flex items-center justify-center pb-2">
          <Input placeholder="Search..." className="h-9 border-2" />
          <SearchIcon
            size={17}
            className="absolute right-0 mr-2 cursor-pointer text-secondary-foreground 
                        transition-colors duration-300 
                        hover:text-primary focus:text-primary"
          />
        </li> */}
        <Link href={`${refLink}`}>
          <li
            className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary "
          >
            <HomeIcon color="var(--accent-foreground)" size={16} className="mx-2" />
            <p className="mx-1 text-base text-secondary-foreground  hover:text-black">Home</p>
          </li>
        </Link>
        <Link href={"/dashboard"}>
          <li
            className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary "
          >
            <Timer color="var(--accent-foreground)" size={16} className="mx-2" />
            <p className="mx-1 text-base text-secondary-foreground  hover:text-black">Timeline</p>
          </li>
        </Link>

        <FeedbackForm />
        <InstructionVideoLink />
      </ul>

      <div className="cursor-pointer">
        <WorkSpace
          userRole={session?.user.role}
          userId={session?.user.id}
          isActive={session?.user.isActive}
        />
      </div>

      <footer className="absolute bottom-0 h-max w-full border-t-2 border-border p-2">
        {!session ? (
          <div className="flex items-center justify-between">
            <Link href={"/signup"}>
              <Button variant={"secondary"}>Sign Up</Button>
            </Link>
            <Link href={"/login"}>
              <Button variant={"dark"} className="px-5">
                Log In
              </Button>
            </Link>
          </div>
        ) : (
          <Dialog>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <UserProfile
                  email={session.user.email}
                  name={session.user.name}
                  image={session.user.image}
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48">
                <DropdownMenuLabel>My Profile</DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-border" />
                <DropdownMenuItem>{session.user.role}</DropdownMenuItem>

                <DialogTrigger asChild>
                  <DropdownMenuItem>
                    <div className="flex items-center justify-center">
                      <User size={18} className="bi bi-bookmark-fill" />
                      <h1 className="ml-4 text-secondary-foreground hover:text-black">Profile</h1>
                    </div>
                  </DropdownMenuItem>
                </DialogTrigger>
                <DropdownMenuItem>
                  <a target="_blank" href="https://account.xocaliber.com/p/login/bIY03RePw42f9OM000">
                    Manage subscription
                  </a>
                </DropdownMenuItem>

                <Logout />
              </DropdownMenuContent>
            </DropdownMenu>{" "}
            <ViewProfile role={session.user.role} />
          </Dialog>
        )}
      </footer>
    </nav>
  );
};
