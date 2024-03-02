"use client";
import React, { useState } from "react";
import AddHeading from "./AddHeading";
import AddSubHeading from "./AddSubHeading";
import AddCheckList from "./AddCheckList";
import { trpc } from "@/app/_trpc/client";
import { LucideTrash2, Trash } from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";

const AdminCheckList = () => {
  const checkListData = trpc.checklist.getCheckListSubHeading.useQuery();
  const [id, setId] = useState("");
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
  console.log(checkListData);
  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Checklist</p>
        <div className="mr-4 flex space-x-12">
          <AddHeading refetchData={refetchData} />
          <AddSubHeading refetchData={refetchData} />
          <AddCheckList refetchData={refetchData} />
        </div>
      </div>
      <div className="scrollableContainer overflow-y-scrollfont-serif m-4 ml-60 h-[90vh]">
        <div>
          <section className="flex w-full flex-col p-8 pt-0 text-black">
            {checkListData &&
              checkListData.data?.map((checkList, index) => (
                <div
                  key={checkList.id}
                  className={`border-2 p-4 ${index === checkListData.data.length - 1 ? "border-b-2" : index % 2 === 0 ? "border-b-0" : ""}`}
                >
                  <div className="pb-2">
                    <h1 className="bg-secondary-foreground p-2 text-3xl font-bold text-white">
                      {checkList.name}
                    </h1>
                    {checkList.subHeading &&
                      checkList.subHeading.map((subHeading) => (
                        <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                          <h3 className="bg-primary p-2 text-xl font-bold">{subHeading.name}</h3>
                          <ul className="space-y-2">
                            {subHeading.Checklist &&
                              subHeading.Checklist.map((item, itemIndex) => (
                                <li
                                  key={item.id}
                                  className={`flex items-center justify-between space-x-12 p-2 pl-10 transition-all duration-300 hover:bg-secondary ${itemIndex === subHeading.Checklist.length - 1 ? "border-b-0" : ""}`}
                                >
                                  <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                                  <p className="flex w-full">{item.name}</p>
                                  <LucideTrash2
                                    className="cursor pointer cursor-pointer fill-destructive hover:fill-red-400"
                                    onClick={() => onDelete(item.id)}
                                  />
                                </li>
                              ))}
                          </ul>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
          </section>
        </div>
      </div>
    </div>
  );
};

export default AdminCheckList;
