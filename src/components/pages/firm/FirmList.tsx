"use client";
import { trpc } from "@/app/_trpc/client";

export const FirmList = () => {
  let page = 5;
  const firmList = trpc.getAllFirm.useQuery(page);

  return <div className="w-[500px] border-l-2 border-border">FirmList</div>;
};
