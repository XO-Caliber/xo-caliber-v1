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
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetFirmProfile } from "@/components/utils/GetFirmProfile";

export const FirmList = () => {
  const [page, setpage] = useState(1);
  const firmList = trpc.home.getAllFirm.useQuery();
  const refetchData = () => {
    firmList.refetch();
  };

  if (firmList.data) {
    return (
      <section className="scrollableContainer flex h-96 w-[350px] flex-col items-center overflow-y-scroll bg-white">
        <div className=" m-4 ml-6">
          <div className="  grid-rows grid w-full  gap-y-5 ">
            {firmList.data.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetFirmProfile
                  email={user.email}
                  name={user.name}
                  image={user.image}
                  userCount={user.userCount}
                  refetchData={refetchData}
                />
              </div>
            ))}
          </div>
          {/* <Pagination className="pt-6">
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
          </Pagination> */}
        </div>
      </section>
    );
  } else {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex min-h-72 w-[350px] flex-col items-center overflow-y-scroll">
        {[...Array(5)].map((_, index) => (
          <div key={index} className=" grid-rows grid w-full  gap-y-5 px-12">
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
