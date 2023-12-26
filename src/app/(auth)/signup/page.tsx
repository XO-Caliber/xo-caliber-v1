import { SignupBox } from "@/components/pages/auth/SignupBox";
import logo from "../../../../public/images/LOGO_Trans.png";
import Image from "next/image";

const page = () => {
  return (
    <section
      className="absolute top-0 left-0 w-full h-full overflow-hidden
                bg-[radial-gradient(ellipse_at_right,_var(--tw-gradient-stops))] from-rose-200 to-white"
    >
      <Image
        className="absolute m-4 right-0"
        priority
        src={logo}
        alt="Logo"
        width={250}
        height={200}
      />
      <div
        className="absolute -top-60 left-28
                    w-[230px] h-[650px] 
                    bg-gradient-to-t from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84]
                    rounded-full -rotate-45 shadow-custom-shadow"
      ></div>
      <div
        className="absolute top-40 left-0
                    w-[100px] h-[350px] 
                    bg-gradient-to-t from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84]
                    rounded-full -rotate-45 shadow-custom-shadow"
      ></div>
      <div
        className="absolute -bottom-72 -left-14
                    w-[230px] h-[650px] 
                    bg-gradient-to-b from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84]
                    rounded-full -rotate-45 shadow-custom-shadow"
      ></div>
      <div
        className="absolute -bottom-72 left-[500px]
                    w-[230px] h-[650px] 
                    bg-gradient-to-b from-[#FF6340] via-[#6279ecf3] to-[#ffbd5a84]
                    rounded-full -rotate-45 shadow-custom-shadow"
      ></div>
      <div className="h-full flex items-center justify-end mr-32">
        <SignupBox />
      </div>
    </section>
  );
};

export default page;
