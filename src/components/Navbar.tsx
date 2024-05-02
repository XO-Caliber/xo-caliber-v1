import Image from "next/image";
import navLogo from "../../public/images/LOGO_Trans.png";
import mainLogo from "../../public/images/side.svg";
import { Input } from "./ui/Input";
import { ArrowDown, BellIcon, HomeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";
import { getAuthSession } from "@/app/api/auth/[...nextauth]/authOptions";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/Avatar";
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
import { user } from "@/types/user";
import ViewProfile from "./pages/profile/ViewProfile";

export const Navbar = async () => {
  const session = await getAuthSession();
  const refLink = session ? "/" : "https://xocaliber.tech/";
  return (
    <nav className="absolute z-50 h-screen w-56 border-r-2 border-border bg-white">
      <Link href={"/"}>
        <div className="flex  items-center justify-center border-b-2 ">
          <Image src={mainLogo} width={117} height={41} alt="LOGO" />
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
        {/* <li
          className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary"
        >
          <BellIcon color="var(--accent-foreground)" size={16} className="mx-2" />
          <p className="mx-1 text-base text-secondary-foreground  hover:text-black">
            Notifications
          </p>
        </li> */}
        {/* <li
          className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary"
        >
          <ArrowDown color="var(--accent-foreground)" size={16} className="mx-2" />
          <p className="mx-1 text-base text-secondary-foreground  hover:text-black">Show more</p>
        </li> */}
      </ul>

      {/* <Link href={"/favorites"}>
        <div className=" cursor-pointer border-2 border-x-0  hover:bg-primary">
          <div className="m-4 w-20 text-secondary-foreground  hover:text-black">
            <span className="mr-0 flex">Favorites</span>
          </div>
        </div>
      </Link> */}
      <div className="cursor-pointer">
        <WorkSpace userRole={session?.user.role} />
      </div>
      <Link href={"/dashboard"}>
        <div className=" cursor-pointer border-2 border-x-0 hover:bg-primary">
          <div className="m-4 w-20 text-secondary-foreground  hover:text-black">
            <span className="mr-0 flex">Dashboard</span>
          </div>
        </div>
      </Link>
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
              <DropdownMenuItem>
                <ViewProfile />
              </DropdownMenuItem>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>

              <Logout />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </footer>
    </nav>
  );
};
