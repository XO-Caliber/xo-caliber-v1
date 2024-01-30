import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import AddQA from "@/components/pages/q&a/addQA/AddQA";

interface QATabsContentProps {
  data: any;
  handleDelete: (questionId: string) => void;
}

const QATabsContent: React.FC<QATabsContentProps> = ({ data, handleDelete }) => {
  return (
    <div>
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <AddQA
              key={questionIndex}
              questionNumber={questionIndex + 1}
              question={question.question}
              mark={question.mark}
              handleDelete={handleDelete}
              id={question.id}
            />
          ))}
        </TabsContent>
      ))}
    </div>
  );
};

export default QATabsContent;
