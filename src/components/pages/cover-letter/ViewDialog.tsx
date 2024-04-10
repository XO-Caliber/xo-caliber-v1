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

interface ViewDialogProps {
  title: string;
  description: Prisma.JsonArray;
  comments: string | null;
  dialogType: string;
}

const ViewDialog = ({ title, description, comments, dialogType }: ViewDialogProps) => {
  let buttonText, contentComponent;

  switch (dialogType) {
    case "section":
      contentComponent = "Section content";
      break;
    case "subSection":
      buttonText = "Add SubSection";
      contentComponent = "Subsection Content";
      break;
    case "exhibit":
      buttonText = "Add Exhibit";
      contentComponent = "Exhibit Content";
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
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>
            Make changes to your profile here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <section className="h-max w-[1000px] ">
          <main>
            <section className="grid grid-cols-2  gap-6">
              <ul className="col-span-2">
                <li className="mb-2 text-lg font-bold">{buttonText}</li>
                <li>{title}</li>
              </ul>

              <ul className="col-span-2 row-span-2">
                <div className="h-[400px] w-full overflow-scroll overflow-x-hidden rounded-md border-2 border-border bg-background p-2 pl-6 ">
                  <EditorOutput content={description} />
                </div>
              </ul>

              <ul className="col-start-3 col-end-4 row-start-1 row-end-3">
                <li className="mb-2 text-lg">Comments</li>

                <li className="h-3/4 w-36 overflow-x-auto bg-secondary text-sm">{comments}</li>
              </ul>

              <div className="col-start-3 col-end-3 row-start-3 row-end-3 flex justify-between">
                <DialogClose>
                  <Button type="reset">Close</Button>
                </DialogClose>
                <Button variant={"primary"} type="submit">
                  Submit
                </Button>
              </div>
            </section>
          </main>
        </section>
      </DialogContent>
    </Dialog>
  );
};

export default ViewDialog;
