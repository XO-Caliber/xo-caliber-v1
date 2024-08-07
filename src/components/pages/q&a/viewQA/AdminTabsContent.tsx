import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import AdminQAContent from "@/components/pages/q&a/viewQA/AdminQAContent";

interface QATabsContentProps {
  data: any;
  handleDelete: (questionId: string) => void;
  refetchData: () => void;
}

const AdminTabsContent: React.FC<QATabsContentProps> = ({ data, handleDelete, refetchData }) => {
  return (
    <div className="m-4">
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <AdminQAContent
              key={questionIndex}
              questionNumber={questionIndex + 1}
              question={question.question}
              mark={question.mark}
              handleDelete={handleDelete}
              id={question.id}
              refetchData={refetchData}
            />
          ))}
        </TabsContent>
      ))}
    </div>
  );
};

export default AdminTabsContent;
