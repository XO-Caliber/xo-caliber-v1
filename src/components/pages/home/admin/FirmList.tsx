"use client";
import { trpc } from "@/app/_trpc/client";
import { UserProfileLoading } from "@/components/utils/UserProfileLoading";
import { GetFirmProfile } from "@/components/utils/GetFirmProfile";

export const FirmList = () => {
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
