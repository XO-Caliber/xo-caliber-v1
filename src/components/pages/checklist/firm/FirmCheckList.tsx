"use client";
import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { ChevronDown, ChevronRight, Info, LucideTrash2, Minus, MinusCircle } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";
import AddFirmHeading from "./AddFirmHeading";
import AddFirmCheckList from "./AddFirmCheckList";
import AddFirmSubHeading from "./AddFirmSubHeading";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/Dialog";
import AddCheckList from "../admin/AddCheckList";
import AddHeading from "../admin/AddHeading";
import AddSubHeading from "../admin/AddSubHeading";

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
  const { mutate: deleteSubHeading } = trpc.checklist.deleteSubHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        toast({
          title: "Deleted heading",
          description: "The heading was deleted successfully"
        });
      }
    },
    onError(err) {
      console.log(err);
    }
  });
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
        <div className="flex items-center justify-center">
          <p className=" my-4 ml-4 mr-2  mt-[1.2rem]  font-bold text-heading">DocuCheck</p>
          <div>
            <Dialog>
              <DialogTrigger asChild>
                <Info size={16} className="cursor-pointer text-heading" />
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <p>
                    The required documentation can vary based on the self petitioned employment
                    based immigration visa that you are applying for due to the nature. However, the
                    XO caliber team provided a generic overview of the types of documents that are
                    commonly required. Keep in mind that DocuCheck provides a checklist to address
                    documentations involved in both EB1A/EB2-NIW and I485 applications at most
                    eighty percent. Thus, you should always choose the right set of documentation
                    through self-assessment or with the help of case handlers i.e. Firm. The
                    checklist can be created by XO Caliber admin or Firm. Based on your profile, the
                    DocuCheck list may vary.
                  </p>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mr-4 flex space-x-12">
          <AddFirmHeading refetchData={refetchData} />
        </div>
      </div>
      <div className=" h-[928px] p-2 bg-dotted-spacing-3 bg-dotted-gray-200">
        <div className="scrollableContainer ml-60 h-[85vh]  overflow-y-scroll font-serif shadow-md">
          <div className="mt-4">
            <section className="flex w-full flex-col p-8 pt-0 text-black">
              {checkListData &&
                checkListData.data?.map((checkList, index) => (
                  <div
                    key={checkList.id}
                    className={`space-y-2  border-2 p-4 ${
                      index === checkListData.data.length - 1
                        ? "border-b-2 "
                        : index % 2 === 0
                          ? "border-b-0"
                          : ""
                    }  bg-white `}
                  >
                    <div className="pb-2">
                      <div
                        className={`flex items-center justify-start  bg-gray-200 ${
                          openSubMenus[checkList.id] ? "border-b-0" : ""
                        } rounded-md`}
                      >
                        <i>
                          {openSubMenus[checkList.id] ? (
                            <ChevronDown
                              className="duration-800 cursor-pointer text-black transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          ) : (
                            <ChevronRight
                              className="duration-800 cursor-pointer text-black transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          )}
                        </i>
                        <h1 className=" p-2 text-sm">{checkList.name}</h1>
                        <AddSubHeading refetchData={refetchData} headingId={checkList.id} />
                      </div>
                      <div
                        className={`transition-max-height overflow-hidden duration-500 ${
                          openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                        }`}
                      >
                        {checkList.subHeading &&
                          checkList.subHeading.map((subHeading) => (
                            <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                              <h3 className="flex flex-row items-center justify-start space-x-1 bg-[#FFE6E0] p-2 text-sm ">
                                <p>{subHeading.name}</p>
                                <MinusCircle
                                  className="cursor-pointer text-destructive"
                                  onClick={() => deleteSubHeading(subHeading.id)}
                                  size={14}
                                />
                              </h3>
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
                                      <p className="flex w-full text-sm">{item.name}</p>
                                      <Minus
                                        className="cursor pointer cursor-pointer fill-destructive text-red-700 hover:fill-red-400"
                                        onClick={() => onDelete(item.id)}
                                        size={16}
                                      />
                                    </li>
                                  ))}
                                <li className="p-2">
                                  <AddCheckList
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
    </div>
  );
};

export default FirmCheckList;
