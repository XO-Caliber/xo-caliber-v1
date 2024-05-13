import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { PlusSquare } from "lucide-react";
import AddDialogContent from "./AddDialogContent";
import { DialogType } from "@/types/Dialog";

interface AddDialogProps {
  userId: string;
  itemId: string;
  dialogType: DialogType;
  refetchData: () => void;
  coverletterId?: string;
}

const AddDialog = ({ userId, itemId, dialogType, refetchData, coverletterId }: AddDialogProps) => {
  let title, buttonText, contentComponent;

  switch (dialogType) {
    case "Section":
      title = "Add Section";
      buttonText = "Section";
      contentComponent = (
        <AddDialogContent
          userId={userId}
          itemId={itemId}
          contentType={dialogType}
          refetchData={refetchData}
        />
      );
      break;
    case "Subsection":
      title = "Add Sub section";
      buttonText = "SubSection";
      contentComponent = (
        <AddDialogContent
          userId={userId}
          itemId={itemId}
          contentType={dialogType}
          refetchData={refetchData}
        />
      );
      break;
    case "Exhibit":
      title = "Add Exhibit";
      buttonText = "Exhibit";
      contentComponent = (
        <AddDialogContent
          userId={userId}
          itemId={itemId}
          contentType={dialogType}
          refetchData={refetchData}
          coverletterId={coverletterId}
        />
      );
      break;
    default:
      return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"outline"}
          size={"sm"}
          className="border border-dashed border-border py-0 "
        >
          <PlusSquare size={16} className="mr-2" />
          {buttonText}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        <section className="h-max w-[1000px] ">{contentComponent}</section>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
