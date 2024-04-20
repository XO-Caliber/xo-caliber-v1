"use client";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { ChevronDown, ChevronRight, LucideTrash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";
import AddFirmHeading from "./AddFirmHeading";
import AddFirmCheckList from "./AddFirmCheckList";
import AddFirmSubHeading from "./AddFirmSubHeading";

interface SubMenuState {
  [key: string]: boolean;
}

const FirmCheckList = () => {
  const checkListData = trpc.checklist.getFirmCheckListSubHeading.useQuery();
  const [id, setId] = useState("");
  const [openSubMenus, setOpenSubMenus] = useState<SubMenuState>({});

  const refetchData = () => {
    checkListData.refetch();
  };

  const { mutate: deleteCheckList } = trpc.checklist.deleteCheckList.useMutation({
    onSuccess({ success }) {
      if (success) {
        checkListData.refetch();
        toast({
          title: "Deleted checklist"
        });
      }
    },
    onError(err) {}
  });

  const onDelete = (id: string) => {
    try {
      deleteCheckList(id);
    } catch (err) {
      console.log(err);
    }
  };

  const toggleSubMenu = (subHeadingId: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [subHeadingId]: !prevState[subHeadingId]
    }));
  };

  return (
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Checklist</p>
        <div className="mr-4 flex space-x-12">
          <AddFirmHeading refetchData={refetchData} />
        </div>
      </div>
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
                      className={`flex items-center justify-start  bg-gray-500 ${
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
                      <AddFirmSubHeading refetchData={refetchData} headingId={checkList.id} />
                    </div>
                    <div
                      className={`transition-max-height overflow-hidden duration-500 ${
                        openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                      }`}
                    >
                      {checkList.subHeading &&
                        checkList.subHeading.map((subHeading) => (
                          <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                            <h3 className="bg-primary p-2 text-lg font-bold">{subHeading.name}</h3>
                            <ul className="space-y-2">
                              {subHeading.Checklist &&
                                subHeading.Checklist.map((item, itemIndex) => (
                                  <li
                                    key={item.id}
                                    className={`flex items-center justify-between space-x-12 p-2 pl-10 transition-all duration-500 hover:bg-secondary ${
                                      itemIndex === subHeading.Checklist.length - 1
                                        ? "border-b-0"
                                        : ""
                                    }`}
                                  >
                                    <Checkbox className="" />
                                    <p className="flex w-full">{item.name}</p>
                                    <LucideTrash2
                                      className="cursor pointer cursor-pointer fill-destructive hover:fill-red-400"
                                      onClick={() => onDelete(item.id)}
                                    />
                                  </li>
                                ))}
                              <li className="p-2">
                                <AddFirmCheckList
                                  refetchData={refetchData}
                                  subHeadingId={subHeading.id}
                                />
                              </li>
                            </ul>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default FirmCheckList;
