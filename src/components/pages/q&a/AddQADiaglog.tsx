import { Button } from "@/components/ui/Button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/Dialog";
import { PlusSquare } from "lucide-react";
import QADialogContent from "./QADialogContent";

const AddQADiaglog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 font-medium hover:border"
          // onClick={handleOpen}
          size={"sm"}
        >
          <PlusSquare size={16} />
          <p className="ml-2">Create Q&A</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Q&A</DialogTitle>
          <DialogDescription>Write a question for your client to answer:</DialogDescription>

          {/* <QAPopUp handleOpen={handleOpen} handleData={handleAddData} datas={data.datas} /> */}
          <QADialogContent />

          <DialogFooter>
            <Button type="submit" className="mt-4" variant="primary">
              Add Question
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddQADiaglog;
