import { LoginBox } from '@/components/pages/auth/LoginBox';
import logo from '../../../../public/images/LOGO_Trans.png';
import Image from 'next/image';
const page = () => {
  return (
    <section
      className="absolute top-0 left-0 w-full h-full overflow-hidden
                bg-[radial-gradient(ellipse_at_left,_var(--tw-gradient-stops))] from-rose-200 to-white"
    >
      <Image
        className="m-4"
        priority
        src={logo}
        alt="Logo"
        width={250}
        height={200}
      />
      <div
        className="absolute top-1/2 left-1/2 translate-x-[85%] -translate-y-1/2 w-[620px] h-[620px]
                      bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
                      rounded-[135px] rotate-45 shadow-custom-shadow"
      ></div>
      <div
        className="absolute -top-96 right-52 w-[620px] h-[620px]
                      bg-gradient-to-t from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
                      rounded-[135px] transform rotate-45 shadow-custom-shadow"
      ></div>
      <div
        className="absolute -bottom-96 right-52  w-[620px] h-[620px]
                      bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a84]
                      rounded-[135px] transform rotate-45 shadow-custom-shadow"
      ></div>
      <div className="h-full flex items-start justify-start mt-20 ml-20 ">
        <LoginBox />
      </div>
    </section>
  );
};

export default page;
