"use client";
import { CheckSquare, ChevronDown, ChevronRight, FileEdit, Wind } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const WorkSpace = () => {
  const [isSubMenuHidden, setIsSubMenuHidden] = useState(true);

  const toggleSubMenu = () => {
    setIsSubMenuHidden(!isSubMenuHidden);
  };
  const router = useRouter();
  return (
    <div
      className={`border-2 border-x-0 border-t-0 transition-all duration-300 ease-in ${
        isSubMenuHidden && "hover:border-y-0"
      }`}
    >
      <div
        className={`flex w-full items-center justify-between ${
          isSubMenuHidden ? "hover:bg-primary" : ""
        }   hover:text-black`}
        onClick={toggleSubMenu}
      >
        <span className={`m-4 mr-2 text-muted hover:text-black`}>Workspaces</span>
        <span className="mr-4 text-sm" id="arrow">
          {isSubMenuHidden ? (
            <ChevronRight className={`bi bi-chevron-down text-muted`} />
          ) : (
            <ChevronDown className="bi bi-chevron-down text-muted" />
          )}
        </span>
      </div>

      <div
        className={`mx-auto mt-2 w-4/5 text-left text-sm text-muted text-muted transition-all duration-300 ${
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
          className="flex cursor-pointer items-center rounded-md p-2 px-4 text-muted duration-300 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-caliberq&a")}
        >
          <CheckSquare className="bi bi-bookmark-fill" />
          <h1 className="hover ml-4 text-muted hover:text-black">XO Caliber Q&A</h1>
        </div>
        <div
          className="flex cursor-pointer items-center rounded-md p-2.5 px-4 text-muted duration-300 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-coverletter")}
        >
          <FileEdit className="bi bi-bookmark-fill" />
          <h1 className="ml-4 text-muted hover:text-black">XO Cover Letter</h1>
        </div>
        <div
          className="flex cursor-pointer items-center rounded-md p-2.5 px-4 text-muted duration-300 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-mindmap")}
        >
          <Wind className="bi bi-bookmark-fill" />
          <h1 className="ml-4 text-muted hover:text-black">XO Mind Map</h1>
        </div>
        <div
          className="mb-2 flex cursor-pointer items-center rounded-md p-2.5 px-4 text-muted duration-300 hover:bg-primary"
          onClick={() => router.push("/workspaces/xo-spidergraph")}
        >
          <CheckSquare className="bi bi-bookmark-fill" />
          <h1 className="ml-4 text-muted hover:text-black">XO Spider Graph</h1>
        </div>
      </div>
    </div>
  );
};

export default WorkSpace;
