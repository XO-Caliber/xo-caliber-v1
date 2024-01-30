import { TabsTrigger } from "@/components/ui/Tabs";
import React from "react";

interface QATabsTriggerProps {
  categories: string[];
}
const QATabsTrigger: React.FC<QATabsTriggerProps> = ({ categories }) => {
  return (
    <div>
      {categories.map((cat) => (
        <TabsTrigger key={cat} value={cat}>
          {cat.toUpperCase()}
        </TabsTrigger>
      ))}
    </div>
  );
};

export default QATabsTrigger;
