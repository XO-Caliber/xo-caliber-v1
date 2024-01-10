"use client";
import { trpc } from "@/app/_trpc/client";
import { UserProfile } from "@/components/utils/UserProfile";
import { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from "@/components/ui/Pagination";

export const FirmList = () => {
  const [page, setpage] = useState(1.6);
  const firmList = trpc.getAllFirm.useQuery(page);

  if (firmList.data) {
    return (
      <section className="flex h-full w-[500px] flex-col items-center  border-l-2 border-border ">
        <div className=" m-4 ml-6">
          <h2 className="pb-4 text-xl font-semibold">List of all firms:</h2>
          <div className="grid w-full grid-cols-2 gap-x-10 gap-y-5">
            {firmList.data.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <UserProfile email={user.email} name={user.name} />
              </div>
            ))}
          </div>
          <Pagination className="pt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setpage(page - 1)} />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setpage(1)}>1</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setpage(2)}>2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink onClick={() => setpage(3)}>3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext onClick={() => setpage(page + 1)} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </section>
    );
  } else {
    // If the user does not exist, return an error message
    return (
      // <section
      //   className="absolute left-0 top-0 flex h-full w-full
      // items-center justify-center overflow-hidden
      // bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-100 to-white"
      // >
      <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
        Loading...
      </div>
    );
  }
};
