import { LoginBox } from "@/components/pages/auth/LoginBox";
import logo from "../../../../public/images/side.svg";
import Image from "next/image";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const page = async () => {
  //Protect login page from logged user
  const session = await getServerSession();
  if (session) {
    redirect("/");
  }

  return (
    <section
      className="absolute left-0 top-0 z-50
                h-full w-full overflow-hidden
                bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-rose-200 to-white"
    >
      <Link href={"/"}>
        <Image className="absolute mx-4" priority src={logo} alt="Logo" width={380} height={250} />
      </Link>

      {/* Hide on mobile, show on larger screens | Top one */}
      <div
        className="absolute -top-96 right-52 
                  hidden h-[620px]
                  w-[620px] rotate-45 transform rounded-[135px]
                  bg-gradient-to-l from-[#da355b]  via-[#39468f] to-[#7e8ace] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Right one */}
      <div
        className="absolute left-1/2 top-1/2 hidden h-[620px] 
        w-[620px] -translate-y-1/2
        translate-x-[85%] rotate-45 rounded-[135px]  bg-gradient-to-r from-[#da355b]  via-[#39468f] to-[#7e8ace] shadow-custom-shadow lg:block"
      ></div>

      {/* Hide on mobile, show on larger screens | Bottom one */}
      <div
        className="absolute -bottom-96 right-52  
                  hidden h-[620px]
                  w-[620px] rotate-45 transform rounded-[135px]
                  bg-gradient-to-r from-[#da355b]  via-[#39468f] to-[#7e8ace] shadow-custom-shadow lg:block"
      ></div>
      <div className="flex h-full items-center justify-center lg:ml-32 lg:justify-start">
        <LoginBox />
      </div>
    </section>
  );
};

export default page;
