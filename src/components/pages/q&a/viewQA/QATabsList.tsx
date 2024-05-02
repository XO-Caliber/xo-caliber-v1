import React from "react";
import QATabsTrigger from "./QATabsTrigger";
import { TabsList } from "@/components/ui/Tabs";

interface QATabsListProps {
  categories: any;
}
const QATabsList: React.FC<QATabsListProps> = ({ categories }) => {
  return (
    <div className=" mx-12 flex shadow-md">
      <TabsList className="h-16 bg-transparent">
        <QATabsTrigger categories={categories} />
      </TabsList>
    </div>
  );
};

export default QATabsList;
