import { CandlestickChart, CheckSquare, FileEdit, Wind } from "lucide-react";
import React from "react";

export const HomeLink = (user: { name: string | null | undefined }) => {
  return (
    <div>
      <li className="ml-8 w-full pl-4 pt-4 font-bold">
        <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
        <h2 className="text-sm font-normal ">Here is the overview</h2>
      </li>
      <li className="ml-8 grid w-max grid-cols-2 justify-start text-nowrap p-2 text-sm">
        <span className="m-2 flex h-20 w-32 flex-col items-center justify-center rounded-md border-2 border-border text-center hover:border-primary">
          <CheckSquare size={20} className="mb-2" />
          <h1>XO Caliber Q&A</h1>
        </span>
        <span className="m-2 flex h-20 w-32 flex-col items-center justify-center rounded-md border-2 border-border text-center hover:border-primary">
          <FileEdit size={20} className="mb-2" />
          <h1>XO Cover Letter</h1>
        </span>
        <span className="m-2 flex h-20 w-32 flex-col items-center justify-center rounded-md border-2 border-border text-center hover:border-primary">
          <Wind size={20} className="mb-2" />
          <h1>XO Mind Map</h1>
        </span>
        <span className="m-2 flex h-20 w-32 flex-col items-center justify-center rounded-md border-2 border-border text-center hover:border-primary">
          <CandlestickChart size={20} className="mb-2" />
          <h1>XO Spider Graph</h1>
        </span>
      </li>
    </div>
  );
};
