import logo from '../../../../public/images/LOGO_Trans.png';
import Image from 'next/image';
const page = () => {
  return (
    <section
      className="absolute top-0 left-0 w-full h-screen overflow-hidden
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
        className="absolute -right-96 w-[620px] h-[629px]
                      bg-gradient-to-r from-[#FF6340] via-[#6279ecd2] to-[#ffbd5a62]
                      rounded-[135px] transform rotate-45 shadow-custom-shadow"
      ></div>
    </section>
  );
};

export default page;
