"use client";
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
import { PlusSquare, Trash, Trash2, Trash2Icon } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/Input";

const AddCategoryDialog = () => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const categoriesResult = trpc.getFirmCategory.useQuery();
  const { mutate: deleteCategory } = trpc.deleteFirmCategory.useMutation({
    onSuccess({ success }) {
      if (success) {
        router.refresh();
      }
    },
    onError(err) {
      console.log(err);
    }
  });
  const { mutate: addCategory } = trpc.addFirmCategory.useMutation({
    onSuccess({ success }) {
      if (success) {
        toast({
          title: "Category Added",
          description: "Category was added successfully"
        });
      }
    },
    onError(err) {
      toast({
        title: "Something went wrong",
        description: `${err}`
      });
    },
    onSettled() {
      setLoading(false);
    }
  });
  const onSubmit = () => {
    try {
      setLoading(true);
      addCategory(category);
    } catch (err) {
      console.log("Something went wrong");
    }
  };
  const onDelete = (id: string) => {
    try {
      deleteCategory(id);
    } catch (err) {}
  };
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
          <Input placeholder="New category" onChange={(e) => setCategory(e.target.value)} />
          {categoriesResult.data && (
            <ul className="space-y-2">
              {categoriesResult.data.map((cat) => (
                <li
                  key={cat.id}
                  className="flex w-fit items-center justify-center rounded-md border border-muted-foreground bg-secondary px-2 text-sm"
                >
                  {cat.name}
                  <Trash2
                    className="ml-1  cursor-pointer text-red-500"
                    size={14}
                    onClick={() => deleteCategory(cat.id)}
                  />
                </li>
              ))}
            </ul>
          )}
          <DialogFooter>
            <Button
              type="submit"
              className="mt-4"
              variant="primary"
              isLoading={isLoading}
              onClick={onSubmit}
            >
              Add Category
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryDialog;
