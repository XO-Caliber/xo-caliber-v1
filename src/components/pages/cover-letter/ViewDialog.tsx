import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { Prisma } from "@prisma/client";
import EditorOutput from "./utils/EditorOutput";
import { DialogType } from "@/types/Dialog";
import EditDialog from "./EditDialog";

interface ViewDialogProps {
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  dialogType: DialogType;
}

const ViewDialog = ({ title, description, comments, dialogType }: ViewDialogProps) => {
  let buttonText;

  switch (dialogType) {
    case "Section":
      buttonText = "View Section";
      break;
    case "Subsection":
      buttonText = "View SubSection";
      break;
    case "Exhibit":
      buttonText = "View Exhibit";
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
          <DialogTitle>{buttonText}</DialogTitle>
        </DialogHeader>
        <section className="h-max w-[1000px] ">
          <main>
            <section className="grid grid-cols-2  gap-6">
              <ul className="col-span-2">
                <li className="mb-2 text-base font-bold">Title</li>
                <li>{title}</li>
              </ul>

              <ul className="col-span-2 row-span-2">
                <div className="h-[400px] w-full overflow-scroll overflow-x-hidden rounded-md border-2 border-border bg-background p-2 pl-6 ">
                  <EditorOutput content={description} />
                </div>
              </ul>

              <ul className="col-start-3 col-end-4 row-start-1 row-end-3">
                <li className="mb-2 text-lg">Comments</li>
                <li className="h-3/4 w-36 overflow-x-auto bg-secondary p-2 text-sm">{comments}</li>
              </ul>

              <div className="col-start-3 col-end-3 row-start-3 row-end-3 flex justify-center">
                <DialogClose className="w-full">
                  <Button type="reset" className="w-full">
                    Close
                  </Button>
                </DialogClose>
              </div>
            </section>
          </main>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
