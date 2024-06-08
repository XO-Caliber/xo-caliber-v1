"use client";
import { trpc } from "@/app/_trpc/client";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetUserProfile } from "@/components/utils/GetUserProfile";

export const AllUserList = () => {
  let userList;

  userList = trpc.home.getAllUser.useQuery();

  if (userList.data) {
    return (
      <section className="scrollableContainer flex h-96 w-[350px] flex-col items-center overflow-y-scroll bg-white">
        <div className=" m-4 ml-6">
          {/* <h2 className="pb-4 text-xl font-semibold">List of all Assistant:</h2> */}
          <div className="  grid-rows grid w-full gap-y-5  ">
            {userList.data.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetUserProfile email={user.email} name={user.name} image={user.image} />
              </div>
            ))}
          </div>
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
    );
  }
};
