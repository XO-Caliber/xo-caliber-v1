"use client";
import {
  Badge,
  BrainCog,
  CandlestickChart,
  CheckSquare,
  Construction,
  MoreHorizontal,
  WorkflowIcon
} from "lucide-react";
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
import AllUserSelectList from "../spider-graph/admin/AllUserSelectList";
import UserSelectList from "@/components/utils/UserSelectList";
import AssistantUserSelect from "../spider-graph/assistant/AssistantUserSelect";

interface Props {
  userName?: string;
  role?: string;
}
export const AdminTimeLine = ({ role }: Props) => {
  const [user, setUser] = useState("");
  const userName = trpc.home.getUserProfileForTimeLine.useQuery(user);
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
          <p className="my-4 ml-6 mr-2 mt-[1.2rem] font-bold text-heading">Timeline</p>
        </div>
        {role === "ADMIN" && <AllUserSelectList getSelectedUser={handleSelect} />}
        {role === "FIRM" && <UserSelectList getSelectedUser={handleSelect} />}
        {role === "ASSISTANT" && <AssistantUserSelect getSelectedUser={handleSelect} />}
      </div>
      <div className="ml-56 flex h-[58px] items-center justify-center border-2 border-l-0 border-t-0">
        <div className="flex items-center justify-center">
          <p className="my-4 ml-6 mr-2 mt-[1.2rem] font-bold text-heading">
            {user.trim() ? <p>{userName.data?.name}&apos;s Timeline</p> : <p>Select User</p>}
          </p>
        </div>
      </div>
      <div className="scrollableContainer ml-28 h-[87vh] overflow-y-scroll  p-2 pt-4 bg-dotted-spacing-3 bg-dotted-gray-200">
        <VerticalTimeline lineColor="black" animate={true}>
          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: "#C3946D", color: "#fff" }}
            position="right"
            contentStyle={{ background: "#C3946D", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #C3946D" }}
            icon={<CheckSquare />}
            style={{ marginTop: "30px" }}
            iconOnClick={() => toggleSection("Caliber")}
          >
            <h3 className="text-2xl font-bold text-black">Caliber</h3>
            <ul className="ml-6 list-disc text-sm">
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
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} on ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={<MoreHorizontal size={15} className="cursor-pointer" />}
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            iconStyle={{ background: " #05f7e0", color: "black" }}
            contentStyle={{ background: "#05f7e0", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #05f7e0" }}
            position="left"
            icon={<CandlestickChart />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Assess")}
          >
            {" "}
            <h3 className="text-2xl font-bold text-black">Assess</h3>
            <ul className="ml-6 list-disc text-sm  text-gray-600">
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
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={<MoreHorizontal size={15} className="cursor-pointer" />}
                  position="left"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            contentStyle={{ background: "#f78605", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #f78605" }}
            iconStyle={{ background: "#f78605", color: "#fff" }}
            position="right"
            icon={<Construction />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Structure")}
          >
            {" "}
            <h3 className="text-2xl font-bold text-black">Structure</h3>
            <ul className="ml-6 list-disc text-sm">
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
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={<MoreHorizontal size={15} className="cursor-pointer" />}
                  position="right"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            contentStyle={{ background: "#f3fa2f", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #f3fa2f" }}
            iconStyle={{ background: "#f3fa2f", color: "black" }}
            position="left"
            icon={<BrainCog />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Enhance")}
          >
            {" "}
            <h3 className="text-2xl font-bold text-black">Enhance</h3>
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
                Cover Letter Reviewed: You check your cover letter to make sure it&apo;s good.
              </li>
            </ul>
          </VerticalTimelineElement>

          {expandedSections["Enhance"] &&
            userTimeLine.data
              ?.filter((data) => data.title === "ENHANCE")
              .map((data) => (
                <VerticalTimelineElement
                  key={data.id}
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={<MoreHorizontal size={15} className="cursor-pointer" />}
                  position="left"
                ></VerticalTimelineElement>
              ))}

          <VerticalTimelineElement
            className=" cursor-pointer"
            date="Result"
            contentStyle={{ background: "#02f76d", color: "#fff" }}
            contentArrowStyle={{ borderRight: "7px solid  #02f76d" }}
            iconStyle={{ background: "#02f76d", color: "#fff" }}
            position="right"
            icon={<Badge />}
            style={{ marginTop: "120px" }}
            iconOnClick={() => toggleSection("Result")}
          >
            {" "}
            <h3 className="text-2xl font-bold text-black">Result</h3>
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
                  className="-timeline-element--work round-timeline-element cursor-vertical-text text-xs"
                  date={`${data.description} ${data.Date}`}
                  iconStyle={{ background: "black", color: "#fff", borderWidth: "10px" }}
                  style={{ fontFamily: "fantasy" }}
                  icon={<MoreHorizontal size={15} className="cursor-pointer" />}
                  position="right"
                ></VerticalTimelineElement>
              ))}
        </VerticalTimeline>
        ;
      </div>
    </div>
  );
};
