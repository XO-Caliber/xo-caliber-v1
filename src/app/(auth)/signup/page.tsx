import { SignupBox } from "@/components/pages/auth/SignupBox";
import logo from "../../../../public/images/LOGO_Trans.png";
import Image from "next/image";
import Link from "next/link";

const page = () => {
  return (
    <section
      className="absolute left-0 top-0 h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-rose-200 to-white
                "
    >
      <Link href={"/"}>
        <Image
          className="absolute right-0 m-4 mr-72"
          priority
          src={logo}
          alt="Logo"
          width={200}
          height={200}
        />
      </Link>

      {/* Hide on mobile, show on larger screens | Top large one */}
      <div
        className="absolute -top-60 left-28
                  hidden h-[650px] 
                  w-[230px] -rotate-45 rounded-full bg-gradient-to-t
                  from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Top small one */}
      <div
        className="absolute left-0 top-40
                  hidden h-[350px] 
                  w-[100px] -rotate-45 rounded-full bg-gradient-to-t
                  from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Coner one */}
      <div
        className="absolute -bottom-72 -left-14
                  hidden h-[650px] 
                  w-[230px] -rotate-45 rounded-full bg-gradient-to-b
                  from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Bottom large one */}
      <div
        className="absolute -bottom-72 left-[500px]
                  hidden h-[650px] 
                  w-[230px] -rotate-45 rounded-full bg-gradient-to-b
                  from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84] shadow-custom-shadow lg:block"
      ></div>
      <div className="flex h-full items-center justify-center lg:mr-32 lg:justify-end ">
        <SignupBox />
      </div>
    </section>
  );
};

export default page;