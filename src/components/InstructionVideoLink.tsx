"use client";
import { FormInput } from "lucide-react";
import React from "react";

const InstructionVideoLink = () => {
  return (
    <div>
      <li
        className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary "
        onClick={() => window.open("https://xocaliber.tech/instructional-videos/")}
      >
        <FormInput color="var(--accent-foreground)" size={16} className="mx-2" />
        <p className="mx-1 text-base text-secondary-foreground  hover:text-black">Feedback Form</p>
      </li>
    </div>
  );
};

export default InstructionVideoLink;
