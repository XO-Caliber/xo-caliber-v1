"use client";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight, Info, LinkIcon, Loader, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";
import UserSelectList from "@/components/utils/UserSelectList";
import AssistantUserSelect from "../spider-graph/assistant/AssistantUserSelect";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";

interface SubMenuState {
  [key: string]: boolean;
}

const StrategyDoc = ({ role }: { role?: string }) => {
  const [user, setUser] = useState("");
  const checkListData = trpc.checklist.getClientCheckList.useQuery(user);
  // const userData = trpc.checklist.getClientAnswer.useQuery(user);
  const getSelectedUser = (userId: string) => {
    setUser(userId);
  };
  const router = useRouter();

  const [openSubMenus, setOpenSubMenus] = useState<SubMenuState>({});
  const [referenceLinks, setReferenceLinks] = useState<{ [key: string]: string }>(() => {
    const links: { [key: string]: string } = {};
    checkListData.data?.forEach((checkList) => {
      checkList.subHeading?.forEach((subHeading) => {
        subHeading.Checklist?.forEach((item) => {
          item.UserChecked.forEach((checked) => {
            if (checked.referenceLink) {
              links[checked.id] = checked.referenceLink;
            }
          });
        });
      });
    });
    return links;
  });

  const [Link, setLink] = useState("");

  const toggleSubMenu = (subHeadingId: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [subHeadingId]: !prevState[subHeadingId]
    }));
  };

  return (
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <div className="flex items-center justify-center">
          <p className=" m-4 my-4 ml-4 mr-2  mt-[1.2rem]   font-bold text-heading ">DocuView</p>
          <Dialog>
            <DialogTrigger asChild>
              <Info size={18} className="mt-1 cursor-pointer text-heading" />
            </DialogTrigger>
            <DialogContent></DialogContent>
          </Dialog>
        </div>
        {role === "FIRM" ? (
          <UserSelectList getSelectedUser={getSelectedUser} />
        ) : (
          <AssistantUserSelect getSelectedUser={getSelectedUser} />
        )}
      </div>
      <div className=" h-[91vh] p-2 pt-6 ">
        {checkListData.data ? (
          <div className="scrollableContainer  ml-60  h-[85vh] overflow-y-scroll font-serif  ">
            <div>
              <section className="flex w-full flex-col p-8 pt-0 text-black">
                {checkListData &&
                  checkListData.data?.map((checkList, index) => (
                    <div
                      key={checkList.id}
                      className={`border-2 p-4 ${
                        index === checkListData.data.length - 1
                          ? "border-b-2"
                          : index % 2 === 0
                            ? "border-b-0"
                            : ""
                      }`}
                    >
                      <div className="pb-2">
                        <div
                          className={`flex items-center justify-start bg-gray-200 ${
                            openSubMenus[checkList.id] ? "border-b-0" : ""
                          } rounded-md`}
                        >
                          <i className="ml-1">
                            {openSubMenus[checkList.id] ? (
                              <ChevronDown
                                className="duration-800 cursor-pointer  transition-all"
                                onClick={() => toggleSubMenu(checkList.id)}
                                size={15}
                              />
                            ) : (
                              <ChevronRight
                                className="duration-800 cursor-pointer  transition-all"
                                onClick={() => toggleSubMenu(checkList.id)}
                                size={15}
                              />
                            )}
                          </i>
                          <h1 className="cursor-pointer p-2 text-xs ">{checkList.name}</h1>
                        </div>
                        <div
                          className={`transition-max-height overflow-hidden duration-500 ${
                            openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                          }`}
                        >
                          {checkList.subHeading &&
                            checkList.subHeading.map(
                              (subHeading) =>
                                subHeading.Checklist &&
                                subHeading.Checklist.some((item) =>
                                  item.UserChecked.some((checked) => checked.isChecked)
                                ) && (
                                  <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                                    <div className="flex items-center justify-between bg-[#FFE6E0] text-xs">
                                      <h3 className=" p-2 ">{subHeading.name}</h3>
                                      <h3 className="  mr-2 border border-y-0 border-l-2 border-r-0 border-gray-300 p-2 text-xs font-bold text-heading">
                                        Ref Link
                                      </h3>
                                    </div>
                                    <ul className="space-y-2">
                                      {subHeading.Checklist &&
                                        subHeading.Checklist.filter((item) =>
                                          item.UserChecked.some((checked) => checked.isChecked)
                                        ) // Filter items where isChecked is true
                                          .map((item, itemIndex) => (
                                            <li
                                              key={item.id}
                                              className={`flex items-center justify-between space-x-12 p-2 pl-10 transition-all duration-500 hover:bg-secondary ${
                                                itemIndex === subHeading.Checklist.length - 1
                                                  ? "border-b-0"
                                                  : ""
                                              }`}
                                            >
                                              <Checkbox
                                                checked={item.UserChecked.some(
                                                  (checked) => checked.isChecked
                                                )}
                                              />
                                              <p className="flex w-full text-xs">{item.name}</p>
                                              {item.UserChecked.map(
                                                (checked) =>
                                                  checked.isChecked && (
                                                    <div
                                                      className="mr-4 flex flex-row items-center justify-center"
                                                      key={checked.id}
                                                    >
                                                      <LinkIcon
                                                        className="mr-4 cursor-pointer text-sky-400"
                                                        onClick={() => {
                                                          window.open(
                                                            referenceLinks[checked.id] ||
                                                              item.UserChecked.find(
                                                                (checked) => checked.referenceLink
                                                              )?.referenceLink ||
                                                              ""
                                                          );
                                                        }}
                                                      />
                                                    </div>
                                                  )
                                              )}
                                            </li>
                                          ))}
                                    </ul>
                                  </div>
                                )
                            )}
                        </div>
                      </div>
                    </div>
                  ))}
              </section>
            </div>
          </div>
        ) : (
          <div>
            {checkListData.isFetching && (
              <div className="ml-56 flex h-[70vh] items-center justify-center ">
                <Loader size={45} className="rotate-animation text-gray-600" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default StrategyDoc;
