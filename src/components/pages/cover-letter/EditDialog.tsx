import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { DialogType } from "@/types/Dialog";
import { Prisma } from "@prisma/client";
import EditDialogContent from "./EditDialogContent";
interface EditDialogProps {
  id: string;
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  dialogType: DialogType;
  refetchData: () => void;
}

const EditDialog = ({
  id,
  title,
  description,
  comments,
  dialogType,
  refetchData
}: EditDialogProps) => {
  let dialogTitle;

  switch (dialogType) {
    case "Section":
      dialogTitle = "Update Section";
      break;
    case "Subsection":
      dialogTitle = "Update Sub section";
      break;
    case "Exhibit":
      dialogTitle = "Update Exhibit";
      break;
    default:
      return null;
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <p className="">{title}</p>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="border-b-2 border-border pb-2 text-left">
          <DialogTitle>{dialogTitle}</DialogTitle>
        </DialogHeader>
        <section className="h-max w-[1000px] ">
          <EditDialogContent
            contentType={dialogType}
            id={id}
            title={title}
            description={description}
            comments={comments}
            refetchData={refetchData}
          />
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default EditDialog;
