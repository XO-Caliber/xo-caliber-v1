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
import { PlusSquare, X } from "lucide-react";
import { trpc } from "@/app/_trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "@/hooks/use-toast";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
interface CategoryProps {
  refetchData: () => void;
}
const AddCategoryDialog = ({ refetchData }: CategoryProps) => {
  const router = useRouter();
  const [category, setCategory] = useState("");
  const [isLoading, setLoading] = useState(false);
  const categoriesResult = trpc.category.getFirmCategory.useQuery();

  const { mutate: deleteCategory } = trpc.category.deleteFirmCategory.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        categoriesResult.refetch();
        router.refresh();
        toast({
          title: "Deleted Category",
          description: "The category was deleted successfully"
        });
      }
    },
    onError(err) {
      console.log(err);
    }
  });

  const { mutate: addCategory } = trpc.category.addFirmCategory.useMutation({
    onSuccess({ success }) {
      if (success) {
        refetchData();
        categoriesResult.refetch();
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
      if (!category.trim()) {
        toast({
          title: "Validation Error",
          description: "Please enter a valid category.",
          variant: "destructive"
        });
        return;
      }
      setLoading(true);
      addCategory(category);
    } catch (err) {
      console.log("Something went wrong");
    }
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
            <ul className="grid grid-cols-3 gap-x-1 gap-y-2">
              {categoriesResult.data.map((category, index) => (
                <li
                  key={category.id}
                  className={`flex w-fit items-center justify-center 
                  rounded-md border p-1 px-3 text-sm ${
                    index % 2 === 0
                      ? "border-primary bg-primary-light"
                      : "border-muted bg-secondary"
                  }`}
                >
                  {category.name}
                  <X
                    className="ml-1 cursor-pointer text-primary"
                    size={16}
                    onClick={() => deleteCategory(category.id)}
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
