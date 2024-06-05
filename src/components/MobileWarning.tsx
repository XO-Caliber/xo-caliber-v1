import { Laptop, Laptop2Icon } from "lucide-react";
import React from "react";

const MobileWarning: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center bg-dotted-spacing-3 bg-dotted-gray-200">
      <Laptop2Icon size={100} className="text-sky-500" />

      <ul className=" space-y-2 p-6 text-center">
        <li className="tex text-xl font-bold">
          Please switch to a desktop device or maximize the screen to begin your journey
        </li>
        <li className="text-sm">
          XO Caliber doesn&apos;t support mobile yet.Head over to the desktop to unlock the complete
          experience.
        </li>
      </ul>
    </div>
  );
};

export default MobileWarning;
