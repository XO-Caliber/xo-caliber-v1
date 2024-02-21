import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";
import { AssistantQAContent } from "./AssistantQAContent";

interface QATabsContentProps {
  data: any;
}

const AssistantTabsContent: React.FC<QATabsContentProps> = ({ data }) => {
  return (
    <div className="m-4">
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <AssistantQAContent
              key={questionIndex}
              questionNumber={questionIndex + 1}
              question={question.question}
              mark={question.mark}
              id={question.id}
            />
          ))}
        </TabsContent>
      ))}
    </div>
  );
};

export default AssistantTabsContent;
