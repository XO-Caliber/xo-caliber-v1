import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import ViewFirmQA from "@/components/pages/q&a/viewQA/ViewFirmQA";

interface QATabsContentProps {
  data: any;
  handleDelete: (questionId: string) => void;
}

const FirmQATabsContent: React.FC<QATabsContentProps> = ({ data, handleDelete }) => {
  return (
    <div className="m-4">
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <ViewFirmQA
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

export default FirmQATabsContent;
