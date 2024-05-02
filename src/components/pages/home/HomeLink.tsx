import { CandlestickChart, CheckSquare, FileEdit, Wind } from "lucide-react";
import Link from "next/link";
import React from "react";

export const HomeLink = (user: { name: string | null | undefined }) => {
  return (
    <div className="flex flex-col items-center justify-center">
      <li className="ml-4 w-full pl-4 pt-4 font-bold">
        <h1 className="text-2xl font-bold ">Welcome {user.name}</h1>
        <h2 className="text-sm font-normal ">Immigration Process Overview</h2>
      </li>
      <li className="ml-6 grid w-max grid-cols-2 justify-start text-nowrap p-2 text-sm">
        <Link
          href={"/workspaces/xo-caliberq&a"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <CheckSquare size={20} className="mb-2" />
          <h1>Caliber</h1>
        </Link>
        <Link
          href={"/workspaces/xo-coverletter"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <FileEdit size={20} className="mb-2" />
          <h1>Craft</h1>
        </Link>
        <Link
          href={"/workspaces/checklist"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <Wind size={20} className="mb-2" />
          <h1>DocuCheck</h1>
        </Link>
        <Link
          href={"/workspaces/xo-spidergraph"}
          className="m-2 flex h-20 w-32 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-border bg-white text-center hover:border-primary"
        >
          <CandlestickChart size={20} className="mb-2" />
          <h1>Assess</h1>
        </Link>
      </li>
    </div>
  );
};
