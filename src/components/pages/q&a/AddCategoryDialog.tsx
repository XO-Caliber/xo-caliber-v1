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
import CategoryDialogContent from "./CategoryDialogContent";

const AddCategoryDialog = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant={"dark"}
          className="ml-4 border-dashed border-gray-400 hover:border"
          size={"sm"}
          // onClick={handleCategoryPopOpen}
        >
          <PlusSquare size={16} />
          <p className="ml-2">Create Category</p>
        </Button>
      </DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Add Category</DialogTitle>
          <DialogDescription>
            Create a category where a set of questions belongs to:
          </DialogDescription>
          {/* 
          <CategoryPopUp
            handleCategoryPopOpen={handleCategoryPopOpen}
            createCategory={createCategory}
          /> */}
          <CategoryDialogContent />
          <DialogFooter>
            <Button type="submit" className="mt-4" variant="primary">
              Add Category
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
