"use client";
import React, { useState } from "react";
import { ChevronDown, ChevronRight, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { CoverLetterType } from "@/types/CoverLetter";
import DragNDropSection from "./DragNDropSection";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger
} from "@/components/ui/Dropdown-menu";
interface ViewCoverLetterProps {
  CoverLetterData: CoverLetterType[] | null;
  userId: string;
  refetchCaseData: () => void;
}
export const ViewCoverLetter = ({
  CoverLetterData,
  userId,
  refetchCaseData
}: ViewCoverLetterProps) => {
  const [isSectionVisible, setIsSectionVisible] = useState<{ [key: number]: boolean }>({});
  const [caseName, setCaseName] = useState("");
  const { mutate: deleteCase } = trpc.coverletter.deleteCase.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchCaseData();
        toast({
          title: "Deleted Case",
          description: "Case deleted successfully",
          variant: "success"
        });
      }
    },
    onError() {
      toast({
        title: "Something went wrong"
      });
    }
  });

  const { mutate: updateCaseName } = trpc.coverletter.updateCaseName.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchCaseData();
        toast({
          title: "Updated Case Name",
          description: "Case name updated successfully",
          variant: "success"
        });
      }
    },
    onError() {
      toast({
        title: "Something went wrong"
      });
    }
  });
  const deleteCase1 = (id: string) => {
    try {
      deleteCase(id);
    } catch (err) {
      console.log(err);
    }
  };
  const toggleSectionVisibility = (id: number) => {
    setIsSectionVisible((prevState) => ({
      ...prevState,
      [id]: !prevState[id]
    }));
  };

  const handleChange = (id: string) => {
    try {
      updateCaseName({ id: id, title: caseName });
    } catch {}
  };

  return (
    <main>
      {CoverLetterData?.map((coverLetter, index) => (
        <div key={coverLetter.id}>
          <div className="m-2 mb-0 flex items-center gap-12 rounded-t-lg border border-b-0 border-border bg-[#dfd9d5] p-3">
            <button onClick={() => toggleSectionVisibility(index)}>
              {isSectionVisible[index] ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
            </button>
            <div className="flex items-center space-x-2">
              <h1 className="flex flex-row items-center justify-center text-sm font-medium">
                {coverLetter.title}
              </h1>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <MoreHorizontal size={14} />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="ml-20">
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger className="text-xs">Edit</DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <Input
                          value={caseName}
                          placeholder="enter a test"
                          className="h-[25px] text-xs"
                          onChange={(e) => setCaseName(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              handleChange(coverLetter.id);
                            }
                          }}
                        />
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem className="text-xs" onClick={() => deleteCase1(coverLetter.id)}>
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <p className="ml-auto mr-10 justify-items-end text-xs font-medium  text-black">
              Comments
            </p>
          </div>
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
