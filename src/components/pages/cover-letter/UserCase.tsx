import React from "react";
import DragNDropSection from "./DragNDropSection";
import { ChevronDown } from "lucide-react";

export const UserCase = () => {
  return (
    <main>
      <div className="m-2 mb-0 flex items-center gap-12 rounded-t-lg border border-border bg-primary p-3 ">
        <ChevronDown />
        <h1 className="text-base font-medium">Case-1</h1>
        <p className="pr-2 text-left text-sm font-medium text-muted-foreground">Type</p>
        <p className="pr-8 text-left text-sm font-medium text-muted-foreground">Title</p>
        <p className="ml-auto mr-10 justify-items-end text-sm font-medium text-muted-foreground">
          Comments
        </p>
      </div>
      <DragNDropSection />
    </main>
  );
};
