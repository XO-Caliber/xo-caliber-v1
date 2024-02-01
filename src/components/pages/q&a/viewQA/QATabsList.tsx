import React from "react";
import QATabsTrigger from "./QATabsTrigger";
import { TabsList } from "@/components/ui/Tabs";

interface QATabsListProps {
  categories: any;
}
const QATabsList: React.FC<QATabsListProps> = ({ categories }) => {
  return (
    <div className="flex justify-center">
      <TabsList>
        <QATabsTrigger categories={categories} />
      </TabsList>
    </div>
  );
};

export default QATabsList;
