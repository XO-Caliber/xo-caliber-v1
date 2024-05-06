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
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">Timeline</p>
        </div>
      </div>
      <div className="ml-56 flex h-[58px] items-center justify-center border-2 border-l-0 border-t-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">
            {userName}&apos;s Timeline
          </p>
        </div>
      </div>
      <div className="scrollableContainer ml-28 h-[87vh] overflow-y-scroll bg-secondary p-2 pt-4 text-lg font-bold text-heading bg-dotted-spacing-3 bg-dotted-gray-200">
        <VerticalTimeline lineColor="black" animate={true}>
          <VerticalTimelineElement
            className=" cursor-pointer text-xl font-bold"
            date="Caliber"
            iconStyle={{ background: "#C3946D", color: "#fff" }}
            position="right"
            icon={<CheckSquare />}
            style={{ marginTop: "30px" }}
            iconOnClick={() => toggleSection("Caliber")}
          ></VerticalTimelineElement>

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
            className=" cursor-pointer"
            date="Assess"
            iconStyle={{ background: "#05f7e0", color: "black" }}
            position="left"
            icon={<CandlestickChart />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Assess")}
          ></VerticalTimelineElement>

          {expandedSections["Assess"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ASSESS")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
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
            date="Structure"
            iconStyle={{ background: "#f78605", color: "#fff" }}
            position="right"
            icon={<Construction />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Structure")}
          ></VerticalTimelineElement>

          {expandedSections["Structure"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "STRUCTURE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
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
            date="Enhance"
            iconStyle={{ background: "#f3fa2f", color: "black" }}
            position="left"
            icon={<BrainCog />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Enhance")}
          ></VerticalTimelineElement>

          {expandedSections["Enhance"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ENHANCE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
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
            date="Result"
            iconStyle={{ background: "#02f76D", color: "#fff" }}
            position="right"
            icon={<Badge />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Result")}
          ></VerticalTimelineElement>

          {expandedSections["Result"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "RESULT")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
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
        ;
      </div>
    </div>
  );
};
