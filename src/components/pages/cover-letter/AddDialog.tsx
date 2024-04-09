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
import AddSectionDialogContent from "./AddSectionDialogContent";
import AddSubSectionDialogContent from "./AddSubSectionDialogContent";
import AddDialogContent from "./AddDialogContent";

const AddDialog = ({
  userId,
  itemId,
  dialogType
}: {
  userId: string;
  itemId: string;
  dialogType: string;
}) => {
  let title, buttonText, contentComponent;

  switch (dialogType) {
    case "section":
      title = "Add Section";
      buttonText = "Create Section";
      // contentComponent = <AddSectionDialogContent userId={userId} coverLetterId={itemId} />;
      contentComponent = (
        <AddDialogContent userId={userId} itemId={itemId} contentType={dialogType} />
      );
      break;
    case "subSection":
      title = "Add Sub section";
      buttonText = "Add SubSection";
      contentComponent = (
        <AddDialogContent userId={userId} itemId={itemId} contentType={dialogType} />
      );
      break;
    case "exhibit":
      title = "Add Exhibit";
      buttonText = "Add Exhibit";
      contentComponent = (
        <AddDialogContent userId={userId} itemId={itemId} contentType={dialogType} />
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
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-max w-[1000px] ">{contentComponent}</section>
      </DialogContent>
    </Dialog>
  );
};

export default AddDialog;
