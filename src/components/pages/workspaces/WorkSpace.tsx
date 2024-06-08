"use client";
import { CandlestickChart, CheckSquare, CheckSquare2, EyeIcon, FileEdit } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

interface Props {
  userRole?: string;
  userId?: string;
  isActive?: Boolean | undefined;
}
const WorkSpace = ({ userRole, userId, isActive }: Props) => {
  const [isSubMenuHidden, setIsSubMenuHidden] = useState(false);

  const toggleSubMenu = () => {
    setIsSubMenuHidden(!isSubMenuHidden);
  };
  const router = useRouter();
  return (
    <div
      className={`transform border-2 border-x-0 border-y-2  pb-4 transition-all delay-300 duration-300 ease-in ${
        isSubMenuHidden && ""
      }`}
    >
      <div
        className={`flex w-full items-center justify-between ${
          isSubMenuHidden ? "transition-all duration-500 hover:bg-primary" : ""
        }   hover:text-black`}
      >
        <span
          className={`m-4 ${
            isSubMenuHidden ? "mb-4" : "mb-1.5"
          } mr-2 text-secondary-foreground hover:text-black`}
        >
          Workspace
        </span>
      </div>

      <div
        className={`mx-auto mt-2 w-4/5 text-left text-sm text-secondary-foreground transition-all duration-300 ease-in ${
          isSubMenuHidden ? "hidden" : "block"
        } transition-all duration-300 ease-in`}
        id="submenu"
        style={{
          maxHeight: isSubMenuHidden ? "0" : "1000px", // Set a maximum height
          overflow: "hidden", // Hide content that exceeds the height
          transition: "max-height 0.3s ease-in-out" // Slide transition effect
        }}
      >
        <div
          className="flex cursor-pointer items-center rounded-md p-2 px-4 text-secondary-foreground duration-300 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-caliberq&a")}
        >
          <CheckSquare size={18} className="bi bi-bookmark-fill" />
          <h1 className="hover ml-4 text-secondary-foreground hover:text-black">Caliber</h1>
        </div>
        <div
          className=" flex cursor-pointer items-center rounded-md p-2 px-4 text-secondary-foreground transition-all duration-500 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-spidergraph")}
        >
          <CandlestickChart size={18} className="bi bi-bookmark-fill" />
          <h1 className="ml-4 text-secondary-foreground hover:text-black">Assess</h1>
        </div>
        {(userRole === "INDIVIDUAL" || userRole === "FIRM" || userRole === "ADMIN") && (
          <div
            className="flex cursor-pointer items-center  rounded-md p-2 px-4 text-secondary-foreground transition-all duration-500 hover:bg-primary"
            onClick={() => router.push("/workspaces/checklist")}
          >
            <CheckSquare2 size={18} className="bi bi-bookmark-fill" />
            <h1 className="ml-4 text-secondary-foreground hover:text-black">DocuCheck</h1>
          </div>
        )}
        {(userRole === "FIRM" || userRole === "ASSISTANT") && (
          <div
            className=" flex cursor-pointer items-center rounded-md p-2 px-4 text-secondary-foreground transition-all duration-500 hover:bg-primary"
            onClick={() => router.push("/workspaces/strategy-doc")}
          >
            <EyeIcon size={18} className="bi bi-bookmark-fill" />
            <h1 className="ml-4 text-secondary-foreground hover:text-black">DocuView</h1>
          </div>
        )}{" "}
        <div
          className="flex cursor-pointer items-center rounded-md p-2 px-4 text-secondary-foreground transition-all duration-500 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-coverletter")}
        >
          <FileEdit size={18} className="bi bi-bookmark-fill" />
          <h1 className="ml-4 text-secondary-foreground hover:text-black">Craft</h1>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
