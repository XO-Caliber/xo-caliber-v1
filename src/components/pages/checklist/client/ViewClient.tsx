"use client";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import AddHeading from "../admin/AddHeading";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";

interface UserProps {
  userId: string;
}
interface SubMenuState {
  [key: string]: boolean;
}

const ViewClient = ({ userId }: UserProps) => {
  const checkListData = trpc.checklist.getClientCheckList.useQuery(userId);
  const userData = trpc.checklist.getClientAnswer.useQuery(userId);
  const [openSubMenus, setOpenSubMenus] = useState<SubMenuState>({});
  const [referenceLinks, setReferenceLinks] = useState<{ [key: string]: string }>({});
  const [Link, setLink] = useState("");
  const toggleSubMenu = (subHeadingId: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [subHeadingId]: !prevState[subHeadingId]
    }));
  };
  const userAnswerMap = new Map();
  if (userData) {
    userData.data?.forEach((data) => userAnswerMap.set(data.checkListId, data.isChecked));
  }

  const { mutate: updateCheck } = trpc.checklist.addClientChecked.useMutation({
    onSuccess({ success }) {
      userData.refetch();
      if (success) {
        toast({
          title: "Updated successfully"
        });
      }
    }
  });
  const onSubmit = (checkListId: string, checked: boolean) => {
    updateCheck({
      userId: userId,
      checkListId: checkListId,
      isChecked: checked
    });
  };
  const { mutate: updateLink } = trpc.checklist.addReferenceLink.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "Updating"
        });
      }
    }
  });
  const handleChange = (checkListId: string, link: string) => {
    setReferenceLinks((prevLinks) => ({
      ...prevLinks,
      [checkListId]: link
    }));
    updateLink({ id: checkListId, link: link });
  };
  return (
    <div>
      <div className="flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] font-bold text-muted">Checklist</p>
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
                        checkList.subHeading.map((subHeading) => (
                          <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                            <h3 className="bg-primary p-2 text-lg font-bold">{subHeading.name}</h3>
                            <ul className="space-y-2">
                              {subHeading.Checklist &&
                                subHeading.Checklist.map((item, itemIndex) => {
                                  const userAnswerId = userData.data?.find(
                                    (data) => data.checkListId === item.id
                                  )?.id;
                                  const referenceLink = referenceLinks[item.id] || "";
                                  const userAnswer = userAnswerMap.get(item.id);

                                  return (
                                    <li
                                      key={item.id}
                                      className={`flex items-center justify-between space-x-12 p-2 pl-10 transition-all duration-500 hover:bg-secondary ${
                                        itemIndex === subHeading.Checklist.length - 1
                                          ? "border-b-0"
                                          : ""
                                      }`}
                                    >
                                      <Checkbox
                                        checked={userAnswer}
                                        onCheckedChange={() =>
                                          onSubmit(userAnswerId || "", !userAnswer)
                                        }
                                      />
                                      <p className="flex w-full">{item.name}</p>
                                      {userAnswer && (
                                        <div className="flex flex-col">
                                          <p className="mr-4 font-serif font-bold">
                                            Reference link
                                          </p>
                                          <Input
                                            className="h-[30px]"
                                            autoFocus={true}
                                            placeholder="Enter the reference link"
                                            value={referenceLink}
                                            onChange={(e) => handleChange(item.id, e.target.value)}
                                          />
                                        </div>
                                      )}
                                    </li>
                                  );
                                })}
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

export default ViewClient;
