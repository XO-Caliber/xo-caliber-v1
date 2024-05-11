"use client";
import React, { useState, useRef, useEffect } from "react";
import { trpc } from "@/app/_trpc/client";
import {
  ChevronDown,
  ChevronRight,
  Info,
  LucideTrash2,
  Minus,
  MinusCircle,
  MoreHorizontal,
  X,
  XSquare
} from "lucide-react";
import { Checkbox } from "@/components/ui/Checkbox";
import { toast } from "@/hooks/use-toast";

import { DropdownMenu } from "@radix-ui/react-dropdown-menu";
import {
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/Dropdown-menu";
import { Input } from "@/components/ui/Input";
import AddHeading from "./AddHeading";

interface SubMenuState {
  [key: string]: boolean;
}

const AdminCheckList = () => {
  const checkListData = trpc.checklist.getCheckListSubHeading.useQuery();
  const [id, setId] = useState("");
  const [openSubMenus, setOpenSubMenus] = useState<SubMenuState>({});
  const [newChecklists, setNewChecklists] = useState<{ [key: string]: string }>({});
  const [newSubHeadings, setNewSubHeadings] = useState<{ [key: string]: string }>({});
  const [showNewSubHeadingInput, setShowNewSubHeadingInput] = useState<string | null>(null);
  const [editingItems, setEditingItems] = useState<{ [key: string]: boolean }>({});

  const refetchData = () => {
    checkListData.refetch();
  };

  const { mutate: updateHeading } = trpc.checklist.updateHeadingName.useMutation({
    onSuccess({ success }) {
      toast({
        title: success ? "Heading updated successfully" : "Heading update failed"
      });
      refetchData();
    }
  });
  const { mutate: updateSubHeading } = trpc.checklist.updateSubHeadingName.useMutation({
    onSuccess({ success }) {
      toast({
        title: success ? "Sub Heading updated successfully" : "Sub Heading update failed"
      });
      refetchData();
    }
  });
  const handleEditItemClick = (itemId: string) => {
    setEditingItems((prev) => ({
      ...prev,
      [itemId]: true
    }));
  };
  const handleCancelEditItemClick = (itemId: string) => {
    setEditingItems((prev) => ({
      ...prev,
      [itemId]: false
    }));
  };

  const handleSaveItemClick = async (itemId: string, newName: string, isHeading: boolean) => {
    try {
      if (isHeading) {
        await updateHeading({ id: itemId, name: newName });
      } else {
        await updateSubHeading({ id: itemId, name: newName });
      }
      setEditingItems((prev) => ({
        ...prev,
        [itemId]: false
      }));
      // Optionally, you can show a success toast or perform other actions upon successful update
    } catch (error) {
      // Handle error (e.g., show error toast)
    }
  };

  const { mutate: addChecklist } = trpc.checklist.addCheckList.useMutation({
    onSuccess({ success }) {
      if (success) {
        checkListData.refetch();
        toast({
          title: "Subheading added",
          description: "Successfully added the subheading"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `Try again ${err}`,
        variant: "destructive"
      });
    }
  });
  const { mutate: deleteHeading } = trpc.checklist.deleteHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        checkListData.refetch();
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
  const { mutate: deleteSubHeading } = trpc.checklist.deleteSubHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        checkListData.refetch();
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

  const toggleSubMenu = (subHeadingId: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [subHeadingId]: !prevState[subHeadingId]
    }));
  };

  const handleAddChecklistClick = (subHeadingId: string) => {
    setOpenSubMenus((prevState) => ({
      ...prevState,
      [subHeadingId]: true
    }));
    setShowNewSubHeadingInput(subHeadingId); // Show the input field for adding checklist
  };

  const handleNewChecklistSubmit = (subHeadingId: string) => {
    const checklistName = newChecklists[subHeadingId];
    if (checklistName.trim() !== "") {
      addChecklist({ name: checklistName, checkSubHeadingId: subHeadingId });
      // Reset the input field value and hide the input field after submission
      setNewChecklists({ ...newChecklists, [subHeadingId]: "" });
      setShowNewSubHeadingInput(null);
    }
  };

  const handleAddSubHeadingClick = (checkListId: string) => {
    setShowNewSubHeadingInput(checkListId);
  };

  const { mutate: addSubHeading } = trpc.checklist.addSubHeading.useMutation({
    onSuccess({ success }) {
      if (success) {
        checkListData.refetch();
        toast({
          title: "Subheading added",
          description: "Successfully added the subheading"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `Try again ${err}`,
        variant: "destructive"
      });
    }
  });

  const handleNewSubHeadingSubmit = (checkListId: string) => {
    const subHeadingName = newSubHeadings[checkListId];
    if (subHeadingName.trim() !== "") {
      addSubHeading({ name: subHeadingName, checkHeadingId: checkListId });
      // Reset the input field value and hide the input field after submission
      setNewSubHeadings({ ...newSubHeadings, [checkListId]: "" });
      setShowNewSubHeadingInput(null);
    }
  };

  return (
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">DocuCheck</p>
          <span
            title="The required documentation can vary based on the self petitioned employment based
            immigration visa that you are applying for due to the nature. However, the XO caliber
            team provided a generic overview of the types of documents that are commonly required.
            Keep in mind that DocuCheck provides a checklist to address documentations involved in
            both EB1A/EB2-NIW and I485 applications at most eighty percent. Thus, you should always
            choose the right set of documentation through self-assessment or with the help of case
            handlers i.e. Firm. The checklist can be created by XO Caliber admin or Firm. Based on
            your profile, the DocuCheck list may vary."
          >
            <Info size={18} className="mt-1 cursor-pointer text-heading " />
          </span>
        </div>
        <div className="mr-4 flex space-x-12">
          <AddHeading refetchData={refetchData} />
        </div>
      </div>
      <div className="h-[91vh] p-2">
        <div className="scrollableContainer ml-60 h-[85vh]  overflow-y-scroll font-serif">
          <div className="mt-4">
            <section className="flex w-full flex-col p-8 pt-0 text-black">
              {checkListData &&
                checkListData.data?.map((checkList, index) => (
                  <div
                    key={checkList.id}
                    className={`mb-1 space-y-2 border-2 bg-white 
                     p-4`}
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
                              className="duration-800 cursor-pointer text-black transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                              size={15}
                            />
                          ) : (
                            <ChevronRight
                              className="duration-800 cursor-pointer text-xs text-black transition-all"
                              onClick={() => toggleSubMenu(checkList.id)}
                              size={15}
                            />
                          )}
                        </i>
                        {editingItems[checkList.id] ? (
                          <div className="p-1">
                            <Input
                              onChange={(e) => {
                                checkList.name = e.target.value;
                              }}
                              className="h-[20px]  text-xs"
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleSaveItemClick(checkList.id, checkList.name, true);
                                }
                              }}
                            />
                          </div>
                        ) : (
                          <h1 className="p-2 text-xs">{checkList.name}</h1>
                        )}
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <MoreHorizontal size={14} className="cursor-pointer" />
                          </DropdownMenuTrigger>

                          {!editingItems[checkList.id] && (
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleEditItemClick(checkList.id)}
                              >
                                Edit
                              </DropdownMenuItem>

                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => deleteHeading(checkList.id)}
                              >
                                Delete
                              </DropdownMenuItem>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => {
                                  handleAddSubHeadingClick(checkList.id);
                                  toggleSubMenu(checkList.id);
                                }}
                              >
                                Add Subtopic
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          )}
                          {editingItems[checkList.id] && (
                            <DropdownMenuContent>
                              <DropdownMenuItem
                                className="cursor-pointer"
                                onClick={() => handleCancelEditItemClick(checkList.id)}
                              >
                                Cancel
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          )}
                        </DropdownMenu>
                      </div>

                      <div
                        className={`transition-max-height overflow-hidden duration-500 ${
                          openSubMenus[checkList.id] ? "max-h-[2000px]" : "max-h-0"
                        }`}
                      >
                        {showNewSubHeadingInput === checkList.id && (
                          <h3 className="mb-1 ml-6 mt-1 flex flex-row items-center justify-start space-x-1 border border-border bg-[#FFE6E0] p-2 text-xs">
                            <Input
                              value={newSubHeadings[checkList.id] || ""}
                              className="h-[20px] w-[300px] border border-gray-400 text-xs "
                              placeholder="new subheading"
                              autoFocus={true}
                              onChange={(e) =>
                                setNewSubHeadings({
                                  ...newSubHeadings,
                                  [checkList.id]: e.target.value
                                })
                              }
                              onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                  e.preventDefault();
                                  handleNewSubHeadingSubmit(checkList.id);
                                }
                              }}
                            />
                            <X
                              size={18}
                              onClick={() => setShowNewSubHeadingInput(null)}
                              className="text-destructive"
                            />
                          </h3>
                        )}

                        {checkList.subHeading &&
                          checkList.subHeading.map((subHeading) => (
                            <div key={subHeading.id} className="mb-1 ml-6 border-2">
                              <h3 className="flex flex-row items-center justify-start space-x-1 bg-[#FFE6E0] p-2 text-xs">
                                {editingItems[subHeading.id] ? (
                                  <div>
                                    <Input
                                      className="h-[20px] text-xs"
                                      onChange={(e) => {
                                        subHeading.name = e.target.value;
                                      }}
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          e.preventDefault();
                                          handleSaveItemClick(
                                            subHeading.id,
                                            subHeading.name,
                                            false
                                          );
                                        }
                                      }}
                                    />
                                  </div>
                                ) : (
                                  <div>
                                    <h2 className="text-xs">{subHeading.name}</h2>
                                  </div>
                                )}
                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <MoreHorizontal size={14} className="cursor-pointer" />
                                  </DropdownMenuTrigger>
                                  {!editingItems[subHeading.id] && (
                                    <DropdownMenuContent>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          handleEditItemClick(subHeading.id);
                                        }}
                                        className="cursor-pointer"
                                      >
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => deleteSubHeading(subHeading.id)}
                                      >
                                        Delete
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        className="cursor-pointer"
                                        onClick={() => handleAddChecklistClick(subHeading.id)}
                                      >
                                        Add Checklist
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  )}
                                  {editingItems[subHeading.id] && (
                                    <DropdownMenuContent>
                                      <DropdownMenuItem
                                        onClick={() => handleCancelEditItemClick(subHeading.id)}
                                      >
                                        Cancel
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  )}
                                </DropdownMenu>
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
                                      <p className="flex w-full text-xs">{item.name}</p>
                                      <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                          <MoreHorizontal size={14} />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                          <DropdownMenuItem
                                            onClick={() => {
                                              deleteCheckList(item.id);
                                            }}
                                          >
                                            Delete
                                          </DropdownMenuItem>
                                        </DropdownMenuContent>
                                      </DropdownMenu>
                                    </li>
                                  ))}
                                {openSubMenus[subHeading.id] && (
                                  <li
                                    className={`flex items-center justify-between space-x-12 p-2 pl-10 transition-all duration-500 hover:bg-secondary`}
                                  >
                                    <Checkbox className="" />
                                    <p className="flex w-full items-center text-xs">
                                      <Input
                                        value={newChecklists[subHeading.id]}
                                        placeholder="New checklist"
                                        className="h-[25px] text-xs"
                                        autoFocus={true}
                                        onChange={(e) =>
                                          setNewChecklists({
                                            ...newChecklists,
                                            [subHeading.id]: e.target.value
                                          })
                                        }
                                        onKeyDown={(e) => {
                                          if (e.key === "Enter") {
                                            e.preventDefault();
                                            handleNewChecklistSubmit(subHeading.id);
                                          }
                                        }}
                                      />
                                      <span title="close">
                                        <X
                                          onClick={() =>
                                            setOpenSubMenus((prevState) => ({
                                              ...prevState,
                                              [subHeading.id]: false
                                            }))
                                          }
                                          size={18}
                                          className="ml-4 cursor-pointer  text-destructive"
                                        />
                                      </span>
                                    </p>
                                  </li>
                                )}
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

export default AdminCheckList;
