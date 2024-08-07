"use client";
import { trpc } from "@/app/_trpc/client";
import { GetUserProfile } from "@/components/utils/GetUserProfile";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";

export const AssistantUserList = () => {
  const userList = trpc.home.getAssistantUser.useQuery();

  if (userList.data?.User) {
    return (
      <section className="scrollableContainer flex h-72 w-[350px] flex-col items-center overflow-y-scroll">
        <div className=" m-4 ml-6">
          <div className="  grid-rows grid w-full  gap-y-5 ">
            {userList.data.User.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetUserProfile email={user.email} name={user.name} image={user.image} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (userList.isFetching || userList.isRefetching) {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex h-max min-h-[280px] w-[310px] flex-col items-center overflow-y-scroll">
        {[...Array(4)].map((_, index) => (
          <div key={index} className=" grid-rows grid w-full  gap-y-5 px-12">
            <UserProfileLoading />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex h-[200px] items-center justify-center ">
        <h1 className=" font-bold">You are not a client</h1>
      </div>
    );
  }
};
