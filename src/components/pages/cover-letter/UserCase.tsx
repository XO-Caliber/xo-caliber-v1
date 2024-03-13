import React from "react";
import DragNDropSection from "./DragNDropSection";
import { ChevronDown } from "lucide-react";

export const UserCase = () => {
  return (
    <main>
      <div className="m-2 mb-0 flex rounded-t-lg border-2 border-border p-2 text-sm font-medium">
        <ChevronDown />
        <p>Case-1</p>
      </div>
      <DragNDropSection />
    </main>
  );
};
