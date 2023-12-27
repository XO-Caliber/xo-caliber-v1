import Image from "next/image";
import navLogo from "../../public/images/LOGO_Trans.png";
import { Input } from "./ui/Input";
import { ArrowDown, BellIcon, HomeIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/Button";

export const Navbar = () => {
  return (
    <nav className="absolute w-52 h-screen border-r-2 border-border">
      <div className="p-2 border-b-2">
        <Image src={navLogo} width={160} height={40} alt="LOGO" />
      </div>
      <ul className="p-2">
        <li className="pb-2 flex justify-center items-center relative">
          <Input placeholder="Search..." className="border-2 h-9" />
          <SearchIcon
            size={17}
            className="absolute right-0 mr-2 cursor-pointer text-muted 
                      transition-colors duration-300 
                      hover:text-primary focus:text-primary"
          />
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer transition-all duration-500
                      hover:bg-primary"
        >
          <HomeIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Home</p>
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer transition-all duration-500
                    hover:bg-primary"
        >
          <BellIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Notifications</p>
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer transition-all duration-500
                    hover:bg-primary"
        >
          <ArrowDown color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Show more</p>
        </li>
      </ul>
      <footer className="absolute bottom-0 w-full h-max p-2 border-t-2 border-border">
        <div className="flex items-center justify-between">
          <Button variant={"secondary"}>
            <Link href={"/signup"}>Sign Up</Link>
          </Button>
          <Button variant={"dark"} className="px-5">
            <Link href={"/login"}>Log In</Link>
          </Button>
        </div>
      </footer>
    </nav>
  );
};
