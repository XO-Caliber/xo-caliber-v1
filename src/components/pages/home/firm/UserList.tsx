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
import { GetUserProfile } from "@/components/utils/GetUserProfile";

interface userListProps {
  userId?: string | undefined;
}

export const UserList = ({ userId }: userListProps) => {
  const [page, setpage] = useState(1);
  let userList;

  if (userId) {
    userList = trpc.home.getFirmUser.useQuery(userId);
  } else {
    userList = trpc.home.getAllUser.useQuery();
  }

  if (userList.data) {
    return (
      <section className="scrollableContainer flex h-52 w-[350px] flex-col items-center overflow-y-scroll">
        <div className=" m-4 ml-6">
          {/* <h2 className="pb-4 text-xl font-semibold">List of all Assistant:</h2> */}
          <div className="  grid-rows grid w-full  gap-y-5 ">
            {userList.data.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetUserProfile email={user.email} name={user.name} image={user.image} />
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
  } else if (userList.isFetching || userList.isRefetching) {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex h-max min-h-[280px] w-[310px] flex-col items-center overflow-y-scroll">
        {[...Array(1)].map((_, index) => (
          <div key={index} className=" grid-rows grid w-full  gap-y-5 px-12">
            <UserProfileLoading />
          </div>
        ))}
      </div>
      // <div className="flex flex-col items-center justify-center rounded-3xl border-2 border-border bg-white p-20">
      //   Loading...
      // </div>
    );
  } else {
    return (
      <div className="flex h-[280px] items-center justify-center bg-blend-color-burn">
        <h1 className=" font-bold">You aren&apos;t under a firm</h1>
      </div>
    );
  }
};
