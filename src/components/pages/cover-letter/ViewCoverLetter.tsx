"use client";
import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Delete,
  DeleteIcon,
  MinusCircle
} from "lucide-react";
import { CoverLetterType } from "@/types/CoverLetter";
import DragNDropSection from "./DragNDropSection";
import AddDialog from "./AddDialog";
import { DialogType } from "@/types/Dialog";
import { trpc } from "@/app/_trpc/client";
import { toast } from "@/hooks/use-toast";

export const ViewCoverLetter = ({
  CoverLetterData,
  userId
}: {
  CoverLetterData: CoverLetterType[];
  userId: string;
}) => {
  const [isSectionVisible, setIsSectionVisible] = useState<{ [key: number]: boolean }>({});
  const { mutate: deleteCase } = trpc.coverletter.deleteCase.useMutation({
    onSuccess({ success }) {
      if (success) {
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

  const refetchData = () => {
    console.log("Data refetch");
  };

  return (
    <main>
      {CoverLetterData?.map((coverLetter, index) => (
        <div key={coverLetter.id}>
          <div className="m-2 mb-0 flex items-center gap-12 rounded-t-lg border border-border bg-[#dfd9d5] p-1.5">
            <button onClick={() => toggleSectionVisibility(index)}>
              {isSectionVisible[index] ? <ChevronDown size={17} /> : <ChevronRight size={17} />}
            </button>
            <h1 className="flex flex-row items-center justify-center text-xs font-medium">
              {coverLetter.title}
              <MinusCircle
                size={16}
                color="red"
                className="ml-1 cursor-pointer fill-white"
                onClick={() => deleteCase1(coverLetter.id)}
              />
            </h1>

            <div className="ml-auto">
              {/* <AddSectionDialog userId={userId} coverLetterId={coverLetter.id} /> */}
              <AddDialog
                userId={userId}
                itemId={coverLetter.id}
                dialogType={DialogType.Section}
                refetchData={refetchData}
              />
            </div>
            <p className="ml-auto mr-10 justify-items-end text-xs font-medium  text-black">
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
