"use client";
import { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { Checkbox } from "@/components/ui/Checkbox";
import { ChevronDown, ChevronRight, Info, Save, SaveIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/Input";
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/components/ui/Dialog";

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

  // const [Link, setLink] = useState("");

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
      // setLink("");
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
      <div className="ml-56 flex h-[68px] items-center justify-start border-2 border-l-0 bg-white">
        <p className=" my-4 ml-4 mr-2  mt-[1.2rem]  font-bold text-heading">DocuCheck</p>
        <div>
          <span
            title=" The required documentation can vary based on the self petitioned employment based
                  immigration visa that you are applying for due to the nature. However, the XO
                  caliber team provided a generic overview of the types of documents that are
                  commonly required. Keep in mind that DocuCheck provides a checklist to address
                  documentations involved in both EB1A/EB2-NIW and I485 applications at most eighty
                  percent. Thus, you should always choose the right set of documentation through
                  self-assessment or with the help of case handlers i.e. Firm. The checklist can be
                  created by XO Caliber admin or Firm. Based on your profile, the DocuCheck list may
                  vary."
          >
            {" "}
            <Info size={16} className="cursor-pointer text-heading" />
          </span>
        </div>
      </div>
      <div className=" h-[91vh] p-2 ">
        <div className="scrollableContainer  ml-60  h-[85vh] overflow-y-scroll font-serif shadow-md">
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
                        className={`flex items-center justify-start bg-gray-200 ${
                          openSubMenus[checkList.id] ? "border-b-0" : ""
                        } rounded-md`}
                      >
                        <i>
                          {openSubMenus[checkList.id] ? (
                            <ChevronDown
                              className="duration-800 cursor-pointer  transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          ) : (
                            <ChevronRight
                              className="duration-800 cursor-pointer  transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                            />
                          )}
                        </i>
                        <h1 className="p-2 text-xs ">{checkList.name}</h1>
                      </div>
                      <div
                        className={`transition-max-height overflow-hidden duration-500 ${
                          openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                        }`}
                      >
                        {checkList.subHeading &&
                          checkList.subHeading.map((subHeading) => (
                            <div key={subHeading.id} className="ml-6 border-2 border-t-0">
                              <div className="flex items-center justify-between bg-[#FFE6E0] text-xs">
                                <h3 className=" p-2 ">{subHeading.name}</h3>
                                <h3 className="  mr-28 border border-y-0 border-l-2 border-r-0 border-gray-300 p-2 text-sm font-bold text-heading">
                                  Ref Link
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
                                      <p className="flex w-full text-xs">{item.name}</p>
                                      {item.UserChecked.map(
                                        (checked) =>
                                          checked.isChecked && (
                                            <div
                                              className="flex flex-row items-center justify-center"
                                              key={checked.id}
                                            >
                                              <Input
                                                className="h-[30px] w-[135px] border-gray-500"
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
                                              <span title="Save">
                                                <SaveIcon
                                                  className="ml-1 inline-block h-[30px]  cursor-pointer fill-sky-400  p-0.5 text-white"
                                                  xlinkTitle="Save"
                                                  onClick={() =>
                                                    handleChange(
                                                      checked.id,
                                                      referenceLinks[checked.id]
                                                    )
                                                  }
                                                  width={25}
                                                />
                                              </span>
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
    </div>
  );
};

export default ViewFirmCheckList;
