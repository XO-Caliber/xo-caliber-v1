import { CandlestickChart, CheckSquare, FileEdit, Wind } from "lucide-react";
import Link from "next/link";
import React from "react";

export const HomeLink = (user: { name: string | null | undefined }) => {
  return (
    <div>
      <li className="ml-4 w-full pl-4 pt-4 font-bold">
        <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
        <h2 className="text-sm font-normal ">Here is the overview</h2>
      </li>
      <li className="ml-4 grid w-max grid-cols-2 justify-start text-nowrap p-2 text-sm">
        <Link
          href={"/workspaces/xo-caliberq&a"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <CheckSquare size={20} className="mb-2" />
          <h1>XO Caliber Q&A</h1>
        </Link>
        <Link
          href={"/workspaces/xo-coverletter"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <FileEdit size={20} className="mb-2" />
          <h1>XO Cover Letter</h1>
        </Link>
        <Link
          href={"/workspaces/xo-mindmap"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <Wind size={20} className="mb-2" />
          <h1>XO Mind Map</h1>
        </Link>
        <Link
          href={"/workspaces/xo-spidergraph"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <CandlestickChart size={20} className="mb-2" />
          <h1>XO Spider Graph</h1>
        </Link>
      </li>
    </div>
  );
};
