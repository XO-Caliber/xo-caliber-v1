import Image from "next/image";
import navLogo from "../../public/images/LOGO_Trans.png";
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

export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="absolute h-screen w-52 border-r-2 border-border">
      <div className="border-b-2 p-2">
        <Image src={navLogo} width={160} height={40} alt="LOGO" />
      </div>
      <ul className="p-2">
        <li className="relative flex items-center justify-center pb-2">
          <Input placeholder="Search..." className="h-9 border-2" />
          <SearchIcon
            size={17}
            className="absolute right-0 mr-2 cursor-pointer text-muted 
                      transition-colors duration-300 
                      hover:text-primary focus:text-primary"
          />
        </li>
        <li
          className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                      hover:bg-primary "
        >
          <HomeIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="mx-1 text-base text-muted hover:text-black">Home</p>
        </li>
        <li
          className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                    hover:bg-primary"
        >
          <BellIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="mx-1 text-base text-muted hover:text-black">Notifications</p>
        </li>
        <li
          className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                    hover:bg-primary"
        >
          <ArrowDown color="var(--muted)" size={16} className="mx-2" />
          <p className="mx-1 text-base text-muted hover:text-black">Show more</p>
        </li>
      </ul>
      <footer className="absolute bottom-0 h-max w-full border-t-2 border-border p-2">
        {!session ? (
          <div className="flex items-center justify-between">
            <Button variant={"secondary"}>
              <Link href={"/signup"}>Sign Up</Link>
            </Button>
            <Button variant={"dark"} className="px-5">
              <Link href={"/login"}>Log In</Link>
            </Button>
          </div>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex cursor-pointer items-center justify-around rounded-md p-2 hover:bg-secondary">
                <Avatar className="h-9 w-9">
                  <AvatarImage
                    src={session.user?.image || "https://default-image-url.com"}
                    alt="profile"
                  />
                  <AvatarFallback>
                    {session.user?.name ? session.user.name.slice(0, 2).toUpperCase() : null}
                  </AvatarFallback>
                </Avatar>
                <ul className="overflow-hidden text-ellipsis pl-4">
                  <li className="text-sm font-medium">{session.user?.name}</li>
                  <li className="text-sm text-muted">{session.user?.email}</li>
                </ul>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-48">
              <DropdownMenuLabel>My Profile</DropdownMenuLabel>
              <DropdownMenuSeparator className="bg-border" />
              <DropdownMenuItem>View Profile</DropdownMenuItem>
              <DropdownMenuItem>Edit Profile</DropdownMenuItem>
              <Logout />
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </footer>
    </nav>
  );
};
