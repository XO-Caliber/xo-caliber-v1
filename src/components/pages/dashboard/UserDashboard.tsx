"use client";
import { trpc } from "@/app/_trpc/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { toast } from "@/hooks/use-toast";
import { ChevronDown, ChevronRight, Plus, Save } from "lucide-react";
import React, { useState } from "react";

const UserDashboard = ({ userId }: { userId?: string }) => {
  const userTimeLine = trpc.dashboard.getUserTimeLine.useQuery(userId || "");

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [showSelects, setShowSelects] = useState<{ [key: string]: boolean }>({});
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const date = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();

  const { mutate: addTimeLine } = trpc.dashboard.addUserTimeline.useMutation({
    onSuccess({ success }) {
      if (success) {
        userTimeLine.refetch();
        toast({
          title: "Timeline added"
        });
      }
    },
    onSettled() {
      setDescription("");
      setCategory("");
    }
  });

  const handleSubmit = () => {
    if (description === "" && category == "") {
      toast({
        title: "Error"
      });
    } else {
      try {
        addTimeLine({
          userId: userId || "",
          description: description,
          title: category,
          date: date.toString()
        });
      } catch (e) {
        console.log(e);
      }
    }
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleSelectChange = (value: string, category: string) => {
    setCategory(category);
    setDescription(value);
  };

  const handlePlusClick = (category: string) => {
    setShowSelects((prevState) => ({
      ...prevState,
      [category]: true
    }));
  };

  return (
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">Dashboard</p>
        </div>
      </div>
      <div className="h-[928px] p-2 bg-dotted-spacing-3 bg-dotted-gray-200">
        <div className="scrollableContainer ml-60 h-[85vh] overflow-y-scroll font-serif shadow-md">
          <div className="mt-4">
            <section className="flex w-full flex-col p-8 pt-0 text-black">
              <ul className={`space-y-2 border-2 bg-white p-4`}>
                <li className={`rounded-md bg-gray-200`}>
                  <h1
                    className="flex cursor-pointer items-center p-2 text-sm"
                    onClick={() => toggleSection("Caliber")}
                  >
                    {expandedSections["Caliber"] ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center"></div>
                      <p>Caliber</p>
                    </div>
                  </h1>
                  {expandedSections["Caliber"] &&
                    userTimeLine.data
                      ?.filter((data) => data.title === "CALIBER")
                      .map((data) => (
                        <div key={data.id}>
                          <p>
                            {data.description}
                            {data.Date}
                          </p>
                        </div>
                      ))}
                  {showSelects["Caliber"] && (
                    <div className="ml-2 flex  w-[300px] items-center justify-center">
                      <Select onValueChange={(value) => handleSelectChange(value, "CALIBER")}>
                        <SelectTrigger className="h-[30px]">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Answered Yes or No questions">
                            Answered Yes or No questions
                          </SelectItem>
                          <SelectItem value="Retaken Yes or No Question">
                            Retaken Yes or No Question
                          </SelectItem>
                          <SelectItem value="Joined Under Firm">Joined Under Firm</SelectItem>
                          <SelectItem value="Left Firm">Left Firm</SelectItem>
                        </SelectContent>
                      </Select>
                      <Save size={21} className="ml-1 cursor-pointer" onClick={handleSubmit} />
                    </div>
                  )}
                  {expandedSections["Caliber"] && (
                    <Plus size={15} onClick={() => handlePlusClick("Caliber")} />
                  )}
                </li>
                <li className={`rounded-md bg-gray-200`}>
                  <h1
                    className="flex cursor-pointer items-center p-2 text-sm"
                    onClick={() => toggleSection("Assess")}
                  >
                    {expandedSections["Assess"] ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center"></div>
                      <p>Assess</p>
                    </div>
                  </h1>
                  {expandedSections["Assess"] &&
                    userTimeLine.data
                      ?.filter((data) => data.title === "ASSESS")
                      .map((data) => (
                        <div key={data.id}>
                          <p>{data.description}</p>
                        </div>
                      ))}
                  {showSelects["Assess"] && (
                    <div className="ml-2 w-[300px]">
                      {" "}
                      <Select onValueChange={() => handleSelectChange}>
                        <SelectTrigger className="h-[30px]">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Self-Evaluation Done">Self-Evaluation Done</SelectItem>
                          <SelectItem value=" Evaluation Done with Assistance">
                            Evaluation Done with Assistance
                          </SelectItem>
                          <SelectItem value="Re-Evaluation Done">Re-Evaluation Done</SelectItem>
                          <SelectItem value="Assessment Completed">Assessment Completed</SelectItem>
                          <SelectItem value="Proceeded with Desired Category">
                            Proceeded with Desired Category
                          </SelectItem>
                          <SelectItem value="Proceeded with Analyzed Category">
                            Proceeded with Analyzed Category
                          </SelectItem>
                          <SelectItem value="Proceeded with Both">Proceeded with Both</SelectItem>
                        </SelectContent>
                      </Select>
                      <Save size={21} className="ml-1" />
                    </div>
                  )}
                  {expandedSections["Assess"] && (
                    <Plus size={15} onClick={() => handlePlusClick("Assess")} />
                  )}
                </li>

                <li className={`rounded-md bg-gray-200`}>
                  <h1
                    className="flex cursor-pointer items-center p-2 text-sm"
                    onClick={() => toggleSection("Structure")}
                  >
                    {expandedSections["Structure"] ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center"></div>
                      <p>Structure</p>
                    </div>
                  </h1>
                  {expandedSections["Structure"] &&
                    userTimeLine.data
                      ?.filter((data) => data.title === "STRUCTURE")
                      .map((data) => (
                        <div key={data.id}>
                          <p>{data.description}</p>
                        </div>
                      ))}
                  {showSelects["Structure"] && (
                    <div className="ml-2 h-[20px] w-[300px]">
                      <Select onValueChange={() => handleSelectChange}>
                        <SelectTrigger className="h-[30px]">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Checklist Process Initiated">
                            Checklist Process Initiated
                          </SelectItem>
                          <SelectItem value="Checklist Process Completed">
                            Checklist Process Completed
                          </SelectItem>
                          <SelectItem value="Checklist Process Reinitiated">
                            Checklist Process Reinitiated
                          </SelectItem>
                          <SelectItem value="Finalized Checklists">Finalized Checklists</SelectItem>
                          <SelectItem value="Self-Start Cover Letter Craft ">
                            Self-Start Cover Letter Craft
                          </SelectItem>
                          <SelectItem value="Cover Letter Craft Started with Assistance">
                            Cover Letter Craft Started with Assistance
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Save size={21} className="ml-1" />
                    </div>
                  )}
                  {expandedSections["Structure"] && (
                    <Plus size={15} onClick={() => handlePlusClick("Enhance")} />
                  )}
                </li>

                <li className={`rounded-md bg-gray-200`}>
                  <h1
                    className="flex cursor-pointer items-center p-2 text-sm"
                    onClick={() => toggleSection("Enhance")}
                  >
                    {expandedSections["Enhance"] ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center"></div>
                      <p>Enhance</p>
                    </div>
                  </h1>
                  {expandedSections["Enhance"] &&
                    userTimeLine.data
                      ?.filter((data) => data.title === "ENHANCE")
                      .map((data) => (
                        <div key={data.id}>
                          <p>{data.description}</p>
                        </div>
                      ))}
                  {showSelects["Enhance"] && (
                    <div className="ml-2 w-[300px]">
                      <Select onValueChange={() => handleSelectChange}>
                        <SelectTrigger className="h-[30px]">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cover Letter Enhanced Myself">
                            Cover Letter Enhanced Myself
                          </SelectItem>
                          <SelectItem value="Cover Letter Enhanced with Assistance">
                            Cover Letter Enhanced with Assistance
                          </SelectItem>
                          <SelectItem value="Cover Letter Completed">
                            Cover Letter Completed
                          </SelectItem>
                          <SelectItem value="Cover Letter Reviewed">
                            Cover Letter Reviewed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Save size={21} className="ml-1" />
                    </div>
                  )}
                  {expandedSections["Enhance"] && (
                    <Plus size={15} onClick={() => handlePlusClick("Enhance")} />
                  )}
                </li>

                <li className={`rounded-md bg-gray-200`}>
                  <h1
                    className="flex cursor-pointer items-center p-2 text-sm"
                    onClick={() => toggleSection("Result")}
                  >
                    {expandedSections["Result"] ? (
                      <ChevronDown size={15} />
                    ) : (
                      <ChevronRight size={15} />
                    )}
                    <div className="flex items-center justify-center">
                      <div className="flex flex-col items-center justify-center"></div>
                      <p>Result</p>
                    </div>
                  </h1>
                  {expandedSections["Result"] &&
                    userTimeLine.data
                      ?.filter((data) => data.title === "RESULT")
                      .map((data) => (
                        <div key={data.id}>
                          <p>{data.description}</p>
                        </div>
                      ))}
                  {showSelects["Result"] && (
                    <div className="ml-2 w-[300px]">
                      <Select onValueChange={() => handleSelectChange}>
                        <SelectTrigger className="h-[30px]">
                          <SelectValue placeholder="select" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Cover Letter Resultd Myself">
                            Cover Letter Resultd Myself
                          </SelectItem>
                          <SelectItem value="Cover Letter Resultd with Assistance">
                            Cover Letter Resultd with Assistance
                          </SelectItem>
                          <SelectItem value="Cover Letter Completed">
                            Cover Letter Completed
                          </SelectItem>
                          <SelectItem value="Cover Letter Reviewed">
                            Cover Letter Reviewed
                          </SelectItem>
                        </SelectContent>
                      </Select>
                      <Save size={21} className="ml-1" />
                    </div>
                  )}
                  {expandedSections["Result"] && (
                    <Plus size={15} onClick={() => handlePlusClick("Result")} />
                  )}
                </li>
              </ul>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
