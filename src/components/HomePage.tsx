import Link from "next/link";
import React from "react";
import { Button } from "./ui/Button";
import Image from "next/image";

export const HomePage = () => {
  return (
    <div id="hero" className="scrollableContainer  h-[93vh] bg-gray-800">
      <div className="flex h-screen items-center justify-center">
        {/* <Image src="/WhiteIcon@200x.png" width={117} height={41} alt="LOGO" /> */}
        <div className="max-w-screen-lg text-center">
          <h1 className="mb-8 text-4xl font-bold text-white md:text-6xl">
            Strategize Immigration Process with our Self-Service Web Platform
          </h1>
          <div className="text-md mb-8 text-white">
            <p>Welcome to XO Caliber</p>
          </div>
          <div className="mb-8 flex items-center justify-center text-center">
            <Link href="http://xocaliber.com/signup" className="">
              <Button variant={"dark"}> Start your Immigration Journey</Button>
            </Link>
          </div>
          <div className="text-center text-white">
            <p>
              Embarking on the journey of self petitioned EB1A/EB2-NIW immigrant visas <br />
              is an exciting endeavor, but navigating the process can be daunting. <br />
              That&apos;s where XO Caliber comes in – your all-in-one platform to <br />
              Calibrate, Assess, Structure, and Enhance (CASE) <br />
              your cover letter individually or with the support of any attorneys/experts (Firm).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
