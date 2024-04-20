"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { CoverLetterType } from "@/types/CoverLetter";
import DragNDropSection from "./DragNDropSection";
import AddDialog from "./AddDialog";
import { DialogType } from "@/types/Dialog";

export const ViewCoverLetter = ({
  CoverLetterData,
  userId
}: {
  CoverLetterData: CoverLetterType[];
  userId: string;
}) => {
  const [isSectionVisible, setIsSectionVisible] = useState<{ [key: number]: boolean }>({});

  const toggleSectionVisibility = (id: number) => {
    setIsSectionVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const refetchData = () => {
    console.log("Data refetch");
  };

  return (
    <main>
      {CoverLetterData?.map((coverLetter, index) => (
        <div key={coverLetter.id}>
          <div className="m-2 mb-0 flex items-center gap-12 rounded-t-lg border border-border bg-primary p-3">
            <button onClick={() => toggleSectionVisibility(index)}>
              {isSectionVisible[index] ? <ChevronDown /> : <ChevronUp />}
            </button>
            <h1 className="text-base font-medium">{coverLetter.title}</h1>
            <p className="pr-2 text-left text-sm font-medium text-muted-foreground">Type</p>
            <p className="pr-8 text-left text-sm font-medium text-muted-foreground">Title</p>
            <div className="ml-auto">
              {/* <AddSectionDialog userId={userId} coverLetterId={coverLetter.id} /> */}
              <AddDialog
                userId={userId}
                itemId={coverLetter.id}
                dialogType={DialogType.Section}
                refetchData={refetchData}
              />
            </div>
            <p className="ml-auto mr-10 justify-items-end text-sm font-medium text-muted-foreground">
              Comments
            </p>
          </div>
          {/* <Button variant={"ghost"} className="mx-2 w-full">
            Add section
          </Button> */}
          <div
            className={`transition-max-height overflow-hidden duration-500 ease-in-out ${
              isSectionVisible[index] ? "h-auto" : "h-0"
            }`}
          >
            {/* Render corresponding content for each cover letter */}
            <DragNDropSection userId={userId} coverLetterId={coverLetter.id} />
          </div>
        </div>
      ))}
    </main>
  );
};
