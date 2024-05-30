import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger
} from "@/components/ui/Dialog";
import { FormInput } from "lucide-react";
import React from "react";

const FeedbackForm = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <li
            className="flex cursor-pointer items-center rounded-md py-2 transition-all duration-500
                        hover:bg-primary "
          >
            <FormInput color="var(--accent-foreground)" size={16} className="mx-2" />
            <p className="mx-1 text-base text-secondary-foreground  hover:text-black">
              Feedback Form
            </p>
          </li>
        </DialogTrigger>
        <DialogContent className="flex h-[700px] w-[80%] max-w-[1200px] flex-col items-center justify-center">
          <DialogHeader>
            Instructional Video: How to Use Our Immigration Visa Process Tool
          </DialogHeader>
          <div className="relative h-0 w-full pb-[56.25%]">
            <iframe
              id="JotFormIFrame-241470595311150"
              title="Feedback Form "
              allowTransparency={true}
              allow="geolocation; microphone; camera; fullscreen"
              src="https://form.jotform.com/241470595311150"
            ></iframe>
          </div>
          <DialogFooter></DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FeedbackForm;
