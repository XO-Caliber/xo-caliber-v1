import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { FileTypeIcon } from "lucide-react";
import { DialogType } from "@/types/Dialog";
import { Prisma } from "@prisma/client";
import EditDialogContent from "./EditDialogContent";
import { ReactNode } from "react";

interface EditDialogProps {
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  dialogType: DialogType;
  refetchData: () => void;
}

const EditDialog = ({ title, description, comments, dialogType, refetchData }: EditDialogProps) => {
  let dialogTitle, buttonText, contentComponent;

  switch (dialogType) {
    case "Section":
      dialogTitle = "Update Section";
      buttonText = "Edit Section";
      contentComponent = (
        <EditDialogContent
          contentType={dialogType}
          title={title}
          description={description}
          comments={comments}
          refetchData={refetchData}
        />
      );
      break;
    case "Subsection":
      dialogTitle = "Update Sub section";
      buttonText = "Edit SubSection";
      contentComponent = "";
      break;
    case "Exhibit":
      dialogTitle = "Update Exhibit";
      buttonText = "Edit Exhibit";
      contentComponent = "";
      break;
    default:
      return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p>{title}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>{dialogTitle}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-max w-[1000px] ">{contentComponent}</section>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
