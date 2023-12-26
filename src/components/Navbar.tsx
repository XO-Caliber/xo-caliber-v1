import Image from "next/image";
import navLogo from "../../public/images/LOGO_Trans.png";
import { Input } from "./ui/Input";
import { ArrowDown, BellIcon, HomeIcon } from "lucide-react";

export const Navbar = () => {
  return (
    <nav className="w-52 h-screen border-r-2 border-border">
      <div className="p-2 border-b-2">
        <Image src={navLogo} width={160} height={40} alt="LOGO" />
      </div>
      <ul className="p-2">
        <li className="pb-2">
          <Input placeholder="Search..." className="border-2 h-9" />
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer
                    hover:bg-primary"
        >
          <HomeIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Home</p>
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer
                    hover:bg-primary"
        >
          <BellIcon color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Notifications</p>
        </li>
        <li
          className="flex items-center rounded-md py-2 cursor-pointer
                    hover:bg-primary"
        >
          <ArrowDown color="var(--muted)" size={16} className="mx-2" />
          <p className="text-muted text-base mx-1 hover:text-black">Show more</p>
        </li>
      </ul>
    </nav>
  );
};
