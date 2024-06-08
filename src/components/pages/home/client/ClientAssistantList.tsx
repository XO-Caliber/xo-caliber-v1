"use client";
import { trpc } from "@/app/_trpc/client";
import { GetUserProfile } from "@/components/utils/GetUserProfile";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetAssistantProfile } from "@/components/utils/GetAssistantProfile";

export const ClientAssistantList = () => {
  const assistantList = trpc.home.getClientAssistants.useQuery();

  if (assistantList.data?.Assistants.length) {
    return (
      <section className="scrollableContainer flex h-min w-[350px] flex-col items-center overflow-y-scroll">
        <div className=" m-4 ml-6">
          {/* <h2 className="pb-4 text-xl font-semibold">List of all Assistant:</h2> */}
          <div className="  grid-rows grid w-full  gap-y-5 ">
            {assistantList.data.Assistants.map((user) => (
              <div key={user.email} className="rounded-md bg-secondary">
                <GetUserProfile email={user.email} name={user.name} image={user.image} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  } else if (assistantList.isFetching || assistantList.isRefetching) {
    // If the user does not exist, return an error message
    return (
      <div className=" scrollableContainer flex h-max max-h-72 w-[310px] flex-col items-center overflow-y-scroll">
        {[...Array(1)].map((_, index) => (
          <div key={index} className=" grid-rows grid w-full  gap-y-5 px-12">
            <UserProfileLoading />
          </div>
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex h-[200px] items-center justify-center bg-blend-color-burn">
        <h1 className=" font-bold">You are not a client</h1>
      </div>
    );
  }
};
