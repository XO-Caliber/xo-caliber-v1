import { LoginBox } from "@/components/pages/auth/LoginBox";
import logo from "../../../../public/images/LOGO_Trans.png";
import Image from "next/image";
import Link from "next/link";
const page = () => {
  return (
    <section
      className="absolute left-0 top-0 
                h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-rose-200 to-white"
    >
      <Link href={"/"}>
        <Image className="absolute m-4" priority src={logo} alt="Logo" width={250} height={200} />
      </Link>

      {/* Hide on mobile, show on larger screens | Top one */}
      <div
        className="absolute -top-96 right-52 
                  hidden h-[620px]
                  w-[620px] rotate-45 transform rounded-[135px]
                  bg-gradient-to-t from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Right one */}
      <div
        className="absolute left-1/2 top-1/2 hidden h-[620px] 
        w-[620px] -translate-y-1/2
        translate-x-[85%] rotate-45 rounded-[135px] bg-gradient-to-r
        from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Bottom one */}
      <div
        className="absolute -bottom-96 right-52  
                  hidden h-[620px]
                  w-[620px] rotate-45 transform rounded-[135px]
                  bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>
      <div className="flex h-full items-center justify-center lg:ml-32 lg:justify-start">
        <LoginBox />
      </div>
    </section>
  );
};

export default page;