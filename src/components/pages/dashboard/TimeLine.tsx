"use client";
import {
  Badge,
  BrainCog,
  CandlestickChart,
  CheckSquare,
  Construction,
  MoreHorizontal,
  Plus,
  PlusCircle,
  SchoolIcon,
  StarIcon,
  WorkflowIcon
} from "lucide-react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { trpc } from "@/app/_trpc/client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/Dropdown-menu";

interface Props {
  userId?: string;
  userName?: string;
}
export const TimeLine = ({ userId, userName }: Props) => {
  const userTimeLine = trpc.dashboard.getUserTimeLine.useQuery(userId || "");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [showSelects, setShowSelects] = useState<{ [key: string]: boolean }>({});
  const date = new Date().getDate() + "/" + new Date().getMonth() + "/" + new Date().getFullYear();
  console.log(description, category, date);

  useEffect(() => {
    handleSubmit();
  }, [description]);

  const { mutate: addTimeLine } = trpc.dashboard.addUserTimeline.useMutation({
    onSuccess({ success }) {
      if (success) {
        userTimeLine.refetch();
        toast({
          title: "Timeline added"
        });
        // Reset category back to "select"
      }
    },
    onSettled() {
      setCategory(""); // No need to reset category here
    }
  });

  const handleSubmit = () => {
    console.log("test");
    if (!description.trim() || !category.trim()) {
      // toast({
      //   title: "Error"
      // });
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

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleSelectChange = ({ value, category }: { value: string; category: string }) => {
    setDescription(value);
    setCategory(category);
  };

  const { mutate: deleteTimeline } = trpc.dashboard.deleteTimeLine.useMutation({
    onSuccess({ success }) {
      userTimeLine.refetch();
      if (success) {
        toast({
          title: "Timeline Deleted"
        });
      }
    }
  });

  const handleDelete = (id: string) => {
    try {
      console.log("delete");

      deleteTimeline(id);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="h-full ">
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0 bg-white">
        <div className="flex items-center justify-center ">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">Timeline</p>
        </div>
      </div>
      <div className="ml-56 flex h-[58px] items-center justify-center border-2 border-l-0 border-t-0 bg-white">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">
            {userName}&apos;s Timeline
          </p>
        </div>
      </div>
      <div className="scrollableContainer  ml-56 h-[83vh]  overflow-y-scroll  p-2  text-lg text-black">
        <VerticalTimeline lineColor="black" animate={true}>
          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: "#C3946D", color: "#fff" }}
            contentStyle={{ background: "#C3946D", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #C3946D" }}
            position="right"
            icon={<CheckSquare />}
            style={{ marginTop: "30px" }}
            iconOnClick={() => toggleSection("Caliber")}
          >
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-black">
              Caliber
            </h3>
            <ul className="ml-6 list-disc text-sm ">
              <li>
                Serves as the foundation for understanding one&apos;s strengths and weaknesses
                within the immigration process.
              </li>
              <li>
                Answered Yes or No questions: You answer simple Yes or No questions about yourself.
              </li>
              <li>
                Retaken Yes or No Question: You can redo any questions you answered &apos;NO&apos;
                earlier if needed.
              </li>
              <li>
                Joined Under Firm: You say if you started working for a company during this process.
              </li>
              <li>Left Firm: You say if you stopped working for a company during this process.</li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Caliber"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "CALIBER")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleDelete(data.id)}
                          >
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}
          {expandedSections["Caliber"] && (
            <VerticalTimelineElement
              className=" "
              iconStyle={{ background: "white", color: "black", borderWidth: "10px" }}
              position="right"
              icon={
                <span title="Add Timeline">
                  <Select
                    onValueChange={(value) =>
                      handleSelectChange({ value: value, category: "CALIBER" })
                    }
                  >
                    <SelectTrigger className="   bg-transparent text-xs"></SelectTrigger>
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
                </span>
              }
              style={{}}
            ></VerticalTimelineElement>
          )}

          <VerticalTimelineElement
            className=" cursor-pointer text-black"
            iconStyle={{ background: "#05f7e0", color: "black" }}
            contentStyle={{ background: "#05f7e0", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #05f7e0" }}
            position="left"
            icon={<CandlestickChart />}
            style={{ marginTop: "120px", color: "black" }}
            iconOnClick={() => toggleSection("Assess")}
          >
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-black">
              Assess
            </h3>
            <ul className="ml-6 list-disc text-sm text-gray-600">
              <li>
                Following the calibration step, users proceed to assess their profile&apos;s
                standing in relation to key criteria for self-petitioned immigration visas.
              </li>
              <li>Self-Evaluation Done: You check how good your application looks on your own.</li>
              <li>
                Evaluation Done with Assistance: Firm helps you check how good your application
                looks.
              </li>
              <li>Re-Evaluation Done: You check your application again after making changes.</li>
              <li>Assessment Completed: You finish checking how good your application looks.</li>
              <li>
                Proceeded with Desired Category: You choose the type of immigration application you
                desire to do.
              </li>
              <li>
                Proceeded with Analyzed Category: You choose a type of immigration application based
                on asessment.
              </li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Assess"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ASSESS")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleDelete(data.id)}
                          >
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="left"
                ></VerticalTimelineElement>
              ))}
          {expandedSections["Assess"] && (
            <VerticalTimelineElement
              className=" "
              iconStyle={{ background: "white", color: "black", borderWidth: "10px" }}
              position="left"
              icon={
                <Select
                  onValueChange={(value) =>
                    handleSelectChange({ value: value, category: "ASSESS" })
                  }
                >
                  <SelectTrigger className="   bg-transparent text-xs"></SelectTrigger>
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
              }
            ></VerticalTimelineElement>
          )}
          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: "#f78605", color: "#fff" }}
            contentStyle={{ background: "#f78605", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #f78605" }}
            position="right"
            icon={<Construction />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Structure")}
          >
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-black ">
              Structure
            </h3>
            <ul className="ml-6 list-disc text-sm ">
              <li>
                In this step, users organize and collect evidence that supports their profile and
                start the craft.
              </li>
              <li>Checklist Process Initiated: You start organizing your documents.</li>
              <li>Checklist Process Completed: You finish organizing your documents.</li>
              <li>Checklist Process Reinitiated: You start organizing your documents again.</li>
              <li>Finalized Checklists: Your document organization is complete.</li>
              <li>
                Self-Start Cover Letter Craft: You begin writing your cover letter on your own.
              </li>
              <li>
                Cover Letter Craft Started with Assistance: You get help from Firm starting your
                cover letter.
              </li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Structure"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "STRUCTURE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleDelete(data.id)}
                          >
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}
          {expandedSections["Structure"] && (
            <VerticalTimelineElement
              className=" "
              iconStyle={{ background: "white", color: "black", borderWidth: "10px" }}
              position="right"
              icon={
                <Select
                  onValueChange={(value) =>
                    handleSelectChange({ value: value, category: "STRUCTURE" })
                  }
                >
                  <SelectTrigger className="   bg-transparent text-xs"></SelectTrigger>
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
              }
              style={{}}
            ></VerticalTimelineElement>
          )}
          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: "#f3fa2f", color: "black" }}
            contentStyle={{ background: "#f3fa2f", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #f3fa2f" }}
            position="left"
            icon={<BrainCog />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Enhance")}
          >
            {" "}
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-black">
              Enhance
            </h3>
            <ul className="ml-6 list-disc text-sm text-gray-600">
              <li>
                With the evidence structured, users focus on enhancing their cover letter for the
                self-petitioned immigration process.
              </li>
              <li>Cover Letter Enhanced Myself: You improve your cover letter on your own.</li>
              <li>
                Cover Letter Enhanced with Assistance: Firm helps you improve your cover letter.
              </li>
              <li>Cover Letter Completed: Your cover letter is finished.</li>
              <li>
                Cover Letter Reviewed: You check your cover letter to make sure it&apos;s good.
              </li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Enhance"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ENHANCE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleDelete(data.id)}
                          >
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="left"
                ></VerticalTimelineElement>
              ))}
          {expandedSections["Enhance"] && (
            <VerticalTimelineElement
              className=" "
              iconStyle={{ background: "white", color: "black", borderWidth: "10px" }}
              position="left"
              icon={
                <Select
                  onValueChange={(value) =>
                    handleSelectChange({ value: value, category: "ENHANCE" })
                  }
                >
                  <SelectTrigger className="   bg-transparent text-xs"></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Cover Letter Enhanced Myself">
                      Cover Letter Enhanced Myself
                    </SelectItem>
                    <SelectItem value="Cover Letter Enhanced with Assistance">
                      Cover Letter Enhanced with Assistance
                    </SelectItem>
                    <SelectItem value="Cover Letter Completed">Cover Letter Completed</SelectItem>
                    <SelectItem value="Cover Letter Reviewed">Cover Letter Reviewed</SelectItem>
                  </SelectContent>
                </Select>
              }
              style={{}}
            ></VerticalTimelineElement>
          )}
          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: "#02f76D", color: "#fff" }}
            contentStyle={{ background: "#02f76d", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #02f76d" }}
            position="right"
            icon={<Badge />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Result")}
          >
            {" "}
            <h3 className="vertical-timeline-element-title text-2xl font-bold text-black">
              Result
            </h3>
            <ul className="ml-6 list-disc text-sm text-gray-600">
              <li> The final step involves the outcome of the user&apos;s immigration petition.</li>
              <li>Immigration Petition Applied: You send your immigration application.</li>
              <li>
                Desired Immigration Petition Approved: The immigration application you desired is
                approved.
              </li>
              <li>
                Desired Immigration Petition Unapproved: The immigration application you desired is
                rejected.
              </li>
              <li>
                Analyzed Immigration Petition Approved: A analyzed immigration application you sent
                is approved.
              </li>
              <li>
                Analyzed Immigration Petition Unapproved: A analyzed immigration application you
                sent is rejected.
              </li>
              <li>Platform Assisted Your Journey: XO Caliber helped you through the process.</li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Result"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "RESULT")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem
                            className="cursor-pointer text-destructive"
                            onClick={() => handleDelete(data.id)}
                          >
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}
          {expandedSections["Result"] && (
            <VerticalTimelineElement
              className=" "
              iconStyle={{ background: "white", color: "#black", borderWidth: "10px" }}
              position="right"
              icon={
                <Select
                  onValueChange={(value) =>
                    handleSelectChange({ value: value, category: "RESULT" })
                  }
                >
                  <SelectTrigger className="border border-white text-xs"></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Immigration Petition Applied ">
                      Immigration Petition Applied
                    </SelectItem>
                    <SelectItem value="Desired Immigration Petition Approved">
                      Desired Immigration Petition Approved
                    </SelectItem>
                    <SelectItem value="Desired Immigration Petition Unapproved">
                      Desired Immigration Petition Unapproved
                    </SelectItem>
                    <SelectItem value="Analyzed Immigration Petition Approved">
                      Analyzed Immigration Petition UnApproved
                    </SelectItem>
                    <SelectItem value="Analyzed Immigration Petition Approved">
                      Analyzed Immigration Petition UnApproved
                    </SelectItem>
                    <SelectItem value="Platform Assisted Your Journey">
                      Platform Assisted Your Journey
                    </SelectItem>
                    <SelectItem value=" Both Immigration Petition Approved">
                      Both Immigration Petition Approved
                    </SelectItem>
                  </SelectContent>
                </Select>
              }
              style={{}}
            ></VerticalTimelineElement>
          )}
        </VerticalTimeline>
      </div>
    </div>
  );
};
