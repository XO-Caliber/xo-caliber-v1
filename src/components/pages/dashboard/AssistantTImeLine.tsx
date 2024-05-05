"use client";
import { MoreHorizontal, WorkflowIcon } from "lucide-react";
import "react-vertical-timeline-component/style.min.css";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import { trpc } from "@/app/_trpc/client";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/Dropdown-menu";
import AssistantUserSelect from "../spider-graph/assistant/AssistantUserSelect";

interface Props {
  userName?: string;
}
export const AssistantTimeLine = () => {
  const [user, setUser] = useState("");
  const userName = trpc.home.getUserProfile.useQuery(user);
  const userTimeLine = trpc.dashboard.getUserTimeLine.useQuery(user);

  const [expandedSections, setExpandedSections] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prevState) => ({
      ...prevState,
      [section]: !prevState[section]
    }));
  };

  const handleSelect = (id: string) => {
    setUser(id);
  };

  return (
    <div>
      <div className="ml-56 flex h-[68px] items-center justify-between border-2 border-l-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">Timeline</p>
        </div>
        <AssistantUserSelect getSelectedUser={handleSelect} />
      </div>
      <div className="ml-56 flex h-[58px] items-center justify-center border-2 border-l-0 border-t-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-4 mr-2 mt-[1.2rem] font-bold text-heading">
            {!user.trim() ? <p>{userName.data?.name}&apos;s Timeline</p> : <p>Select User</p>}
          </p>
        </div>
      </div>
      <div className="scrollableContainer ml-28 h-[87vh] overflow-y-scroll bg-secondary p-2 pt-4 bg-dotted-spacing-3 bg-dotted-gray-200">
        <VerticalTimeline lineColor="black" animate={true}>
          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Caliber"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            position="left"
            icon={<WorkflowIcon />}
            style={{ marginTop: "30px" }}
            iconOnClick={() => toggleSection("Caliber")}
          ></VerticalTimelineElement>

          {expandedSections["Caliber"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "CALIBER")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Assess"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            position="left"
            icon={<WorkflowIcon />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Assess")}
          ></VerticalTimelineElement>

          {expandedSections["Assess"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ASSESS")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Structure"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            position="left"
            icon={<WorkflowIcon />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Structure")}
          ></VerticalTimelineElement>

          {expandedSections["Structure"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "STRUCTURE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Enhance"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            position="left"
            icon={<WorkflowIcon />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Enhance")}
          ></VerticalTimelineElement>

          {expandedSections["Enhance"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ENHANCE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Result"
            iconStyle={{ background: "rgb(33, 150, 243)", color: "#fff" }}
            position="left"
            icon={<WorkflowIcon />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Result")}
          ></VerticalTimelineElement>

          {expandedSections["Result"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "RESULT")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  icon={
                    <span title="Delete">
                      {" "}
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <MoreHorizontal size={15} className="cursor-pointer" />
                        </DropdownMenuTrigger>
                        <DropdownMenuContent>
                          <DropdownMenuItem className="cursor-pointer text-destructive">
                            <p>Delete </p>
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </span>
                  }
                  position="right"
                ></VerticalTimelineElement>
              ))}
        </VerticalTimeline>
        ;
      </div>
    </div>
  );
};
