import React from "react";
import QATabsTrigger from "./QATabsTrigger";
import { TabsList } from "@/components/ui/Tabs";

interface QATabsListProps {
  categories: string[];
}
const QATabsList: React.FC<QATabsListProps> = ({ categories }) => {
  return (
    <div>
      <TabsList>
        <QATabsTrigger categories={categories} />
      </TabsList>
    </div>
  );
};

export default QATabsList;
