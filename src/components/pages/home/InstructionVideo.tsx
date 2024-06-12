import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/Dialog";
import React from "react";

const InstructionVideo = ({ videoLink }: { videoLink: string }) => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant={"dark"}>
            <h1>Instruction</h1>
          </Button>
        </DialogTrigger>
        <DialogContent className="flex h-[700px] w-[80%] max-w-[1200px] flex-col items-center justify-center">
          <DialogHeader>
            Instructional Video: How to Use Our Immigration Visa Process Tool
          </DialogHeader>
          <div className="relative h-0 w-full pb-[56.25%]">
            {" "}
            {/* 16:9 aspect ratio */}
            <iframe
              src={videoLink}
              loading="lazy"
              className="absolute left-0 top-0 h-full w-full"
              title="Synthesia video player - XO Caliber: Caliber and Assess"
              allow="encrypted-media; fullscreen;"
            ></iframe>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InstructionVideo;