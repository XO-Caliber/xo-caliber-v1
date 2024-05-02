"use client";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight, Save } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";

interface UserProps {
  userId: string;
}

interface SubMenuState {
  [key: string]: boolean;
}

const ViewFirmCheckList = ({ userId }: UserProps) => {
  const checkListData = trpc.checklist.getClientCheckList.useQuery(userId);
  const userData = trpc.checklist.getClientAnswer.useQuery(userId);
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

  const { mutate: updateCheck } = trpc.checklist.addClientChecked.useMutation({
    onSuccess({ success }) {
      userData.refetch();
      checkListData.refetch();
      if (success) {
        toast({
          title: "Updated successfully"
        });
      }
    }
  });

  const { mutate: updateLink } = trpc.checklist.addReferenceLink.useMutation({
    onSuccess({ success }) {
      setLink("");
      userData.refetch();
      if (success) {
        toast({
          title: "Updating"
        });
      }
    }
  });

  const handleChange = (checkListId: string, link: string) => {
    const urlPattern = /^(ftp|http|https):\/\/[^ "]+$/;

    if (!urlPattern.test(link)) {
      toast({
        title: "Enter a valid url",
        variant: "destructive"
      });
      console.error("Invalid URL");
      return;
    }

    updateLink({ id: checkListId, link: link });
  };

  return (
    <div>
      <div className=" ml-56 flex h-[68px] items-center justify-between border-2 border-l-0">
        <p className="m-4  mt-[1.2rem] font-bold text-muted">Checklist</p>
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
                      <h1 className="cursor-pointer p-2  font-bold text-white">{checkList.name}</h1>
                    </div>
                    <div
                      className={`transition-max-height overflow-hidden duration-500 ${
                        openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                      }`}
                    >
                      {checkList.subHeading &&
                        checkList.subHeading.map((subHeading) => (
                          <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                            <div className="flex justify-between bg-primary">
                              <h3 className=" p-2 text-lg font-bold">{subHeading.name}</h3>
                              <h3 className="  mr-16 border border-y-0 border-l-2 border-r-0 border-gray-300 p-2 text-lg font-bold">
                                Reference Link
                              </h3>
                            </div>
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
                                    <Checkbox
                                      checked={item.UserChecked.some(
                                        (checked) => checked.isChecked
                                      )}
                                      onCheckedChange={() =>
                                        updateCheck({
                                          userId: userId,
                                          checkListId: item.id,
                                          isChecked: !item.UserChecked.some(
                                            (checked) => checked.isChecked
                                          )
                                        })
                                      }
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
                                              className="h-[50px] border-gray-500"
                                              autoFocus={true}
                                              placeholder="Enter the reference link"
                                              value={
                                                referenceLinks[checked.id] ||
                                                item.UserChecked.find(
                                                  (checked) => checked.referenceLink
                                                )?.referenceLink ||
                                                ""
                                              }
                                              onChange={(e) =>
                                                setReferenceLinks((prevLinks) => ({
                                                  ...prevLinks,
                                                  [checked.id]: e.target.value
                                                }))
                                              }
                                            />
                                            <Save
                                              className=" ml-2 inline-block h-[30px]  cursor-pointer bg-sky-400  p-0.5 text-white"
                                              xlinkTitle="Save"
                                              onClick={() =>
                                                handleChange(checked.id, referenceLinks[checked.id])
                                              }
                                              width={25}
                                            />
                                          </div>
                                        )
                                    )}
                                  </li>
                                ))}
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

export default ViewFirmCheckList;
