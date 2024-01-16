"use client";
import { trpc } from "@/app/_trpc/client";
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
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetFirmProfile } from "@/components/utils/GetFirmProfile";

export const FirmList = () => {
  const [page, setpage] = useState(1);
  const firmList = trpc.getAllFirm.useQuery(page);

  if (firmList.data) {
    return (
      <section className="flex h-full w-[500px] flex-col items-center  border-l-2 border-border ">
        <div className=" m-4 ml-6">
          <h2 className="pb-4 text-xl font-semibold">List of all firms:</h2>
          <div className="grid w-full grid-cols-2 gap-x-10 gap-y-5">
            {firmList.data.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetFirmProfile
                  email={user.email}
                  name={user.name}
                  image={user.image}
                  userCount={user.userCount}
                />
              </div>
            ))}
          </div>
          <Pagination className="pt-6">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious onClick={() => setpage(page > 1 ? page - 1 : 1)} />
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
      <div className="grid w-full grid-cols-2 gap-x-52 gap-y-5">
        {[...Array(10)].map((_, index) => (
          <div key={index} className="h-[55px] w-[200px] rounded-md bg-secondary">
            <UserProfileLoading />
          </div>
        ))}
      </div>
      // <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
      //   Loading...
      // </div>
    );
  }
};
