"use client";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";
import UserSelectList from "@/components/utils/UserSelectList";
import AssistantUserSelect from "../spider-graph/assistant/AssistantUserSelect";

interface SubMenuState {
  [key: string]: boolean;
}

const AssistantStrategy = () => {
  const [user, setUser] = useState("");
  const checkListData = trpc.checklist.getClientCheckList.useQuery(user);
  // const userData = trpc.checklist.getClientAnswer.useQuery(user);
  const getSelectedUser = (userId: string) => {
    setUser(userId);
  };

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
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Checklist</p>
        <AssistantUserSelect getSelectedUser={getSelectedUser} />
      </div>

      {checkListData.data && (
        <div className="scrollableContainer m-4 ml-60 mt-8 h-[85vh] overflow-y-scroll font-serif shadow-md">
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
                        className={`flex items-center justify-start bg-gray-500 ${
                          openSubMenus[checkList.id] ? "border-b-0" : ""
                        } `}
                      >
                        <i>
                          {openSubMenus[checkList.id] ? (
                            <ChevronDown
                              className="duration-800 cursor-pointer text-white transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          ) : (
                            <ChevronRight
                              className="duration-800 cursor-pointer text-white transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          )}
                        </i>
                        <h1 className="cursor-pointer p-2 text-xl font-bold text-white">
                          {checkList.name}
                        </h1>
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
                                  <div className="flex justify-between bg-primary">
                                    <h3 className=" p-2 text-lg font-bold">{subHeading.name}</h3>
                                    <h3 className="  mr-16 border border-y-0 border-l-2 border-r-0 border-gray-300 p-2 text-lg font-bold">
                                      Reference Link
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
                                            <p className="flex w-full ">{item.name}</p>
                                            {item.UserChecked.map(
                                              (checked) =>
                                                checked.isChecked && (
                                                  <div
                                                    className="flex flex-row items-center justify-center"
                                                    key={checked.id}
                                                  >
                                                    <Input
                                                      className="mr-6 h-[50px] border-gray-500"
                                                      autoFocus={true}
                                                      placeholder="Enter the reference link"
                                                      value={
                                                        referenceLinks[checked.id] ||
                                                        item.UserChecked.find(
                                                          (checked) => checked.referenceLink
                                                        )?.referenceLink ||
                                                        ""
                                                      }
                                                      disabled={true}
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
      )}
      {!checkListData.data && (
        <div className="ml-60 flex min-h-[900px] items-center justify-center">
          <p>Choose any client to view document</p>
        </div>
      )}
    </div>
  );
};

export default AssistantStrategy;
