import { TabsTrigger } from "@/components/ui/Tabs";
import React from "react";

interface QATabsTriggerProps {
  categories: string[];
}
const QATabsTrigger: React.FC<QATabsTriggerProps> = ({ categories }) => {
  return (
    <div>
      {categories.map((categorie) => (
        <TabsTrigger key={categorie} value={categorie} className="p-1">
          {categorie.charAt(0).toUpperCase() + categorie.slice(1)}
        </TabsTrigger>
      ))}
    </div>
  );
};

export default QATabsTrigger;
