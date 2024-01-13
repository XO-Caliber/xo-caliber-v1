import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import AddQA from "@/components/pages/q&a/AddQA";

interface QATabsContentProps {
  datas: { category: string; questions: { id: number; mark: string; question: string }[] }[];
  handleDelete: (id: number) => void;
}

const QATabsContent: React.FC<QATabsContentProps> = ({ datas, handleDelete }) => {
  return (
    <div>
      {datas.map((categoryData, categoryIndex) => (
        <TabsContent key={categoryIndex} value={categoryData.category}>
          {categoryData.questions.map((question, questionIndex) => (
            <AddQA
              key={questionIndex}
              questionNumber={question.id + 1}
              question={question.question}
              handleDelete={() => handleDelete(question.id)}
              mark={question.mark}
              id={question.id}
            />
          ))}
        </TabsContent>
      ))}
    </div>
  );
};

export default QATabsContent;
