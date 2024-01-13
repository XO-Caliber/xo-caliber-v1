import { CardTitle } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { X } from "lucide-react";

import React, { useState } from "react";
import { Input } from "@/components/ui/Input";

interface CategoryPopUpProps {
  handleCategoryPopOpen: () => void;
  createCategory: (category: string) => void;
}
const CategoryPopUp: React.FC<CategoryPopUpProps> = ({ handleCategoryPopOpen, createCategory }) => {
  const [category, setCatory] = useState("");
  return (
    <div className="absolute">
      <div className="overflow relative z-10 h-[200px] w-[500px] rounded-lg border border-t-0 border-white bg-secondary-foreground shadow-2xl">
        <p className="absolute ml-4 mt-2 text-sm text-white">Edit</p>
        <X
          className="absolute left-[470px] h-[28px] cursor-pointer pt-1 text-white hover:text-red-400"
          onClick={handleCategoryPopOpen}
        />
        <div className="h-8 rounded-tl-md rounded-tr-md border border-l-0 border-r-0 border-white"></div>
        <CardTitle className="ml-4 pt-4 text-white">Category</CardTitle>
        <div className="flex p-4 pt-4">
          <Input
            value={category}
            className=" h-[50px] w-[300px] border-2 border-border text-[18px] text-black"
            type="text"
            onChange={(e) => setCatory(e.target.value)}
          />
        </div>

        <Button
          variant={"primary"}
          className="relative left-[420px] "
          size={"sm"}
          onClick={() => {
            handleCategoryPopOpen();
            createCategory(category);
          }}
        >
          Save
        </Button>
        <Button
          variant={"outline"}
          className="relative left-[270px]  "
          size={"sm"}
          onClick={() => {
            handleCategoryPopOpen();
          }}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
};

export default CategoryPopUp;
