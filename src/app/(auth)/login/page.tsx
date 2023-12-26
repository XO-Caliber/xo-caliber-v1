import { LoginBox } from "@/components/pages/auth/LoginBox";
import logo from "../../../../public/images/LOGO_Trans.png";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <section
      className="absolute top-0 left-0 
                w-full h-full overflow-hidden
                bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-rose-200 to-white"
    >
      <Link href={"/"}>
        <Image className="absolute m-4" priority src={logo} alt="Logo" width={250} height={200} />
      </Link>

      {/* Hide on mobile, show on larger screens | Top one */}
      <div
        className="absolute -top-96 right-52 
                  w-[620px] h-[620px]
                  bg-gradient-to-t from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
                  rounded-[135px] transform rotate-45 shadow-custom-shadow hidden lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Right one */}
      <div
        className="absolute top-1/2 left-1/2 translate-x-[85%] -translate-y-1/2 
        w-[620px] h-[620px]
        bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
        rounded-[135px] rotate-45 shadow-custom-shadow hidden lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Bottom one */}
      <div
        className="absolute -bottom-96 right-52  
                  w-[620px] h-[620px]
                  bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
                  rounded-[135px] transform rotate-45 shadow-custom-shadow hidden lg:block"
      ></div>
      <div className="h-full flex items-center justify-center lg:justify-start lg:ml-32">
        <LoginBox />
      </div>
    </section>
  );
};

export default page;
