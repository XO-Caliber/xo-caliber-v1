import { TabsTrigger } from "@/components/ui/Tabs";
import React from "react";

interface QATabsTriggerProps {
  categories: string[];
}
const QATabsTrigger: React.FC<QATabsTriggerProps> = ({ categories }) => {
  return (
    <div>
      {categories.map((categorie) => (
        <TabsTrigger
          key={categorie}
          value={categorie}
          className="border-gray m-1 space-x-1 border bg-primary p-1 text-black shadow-md data-[state=active]:bg-black data-[state=active]:text-white"
        >
          {categorie.charAt(0).toUpperCase() + categorie.slice(1)}
        </TabsTrigger>
      ))}
    </div>
  );
};

export default QATabsTrigger;
