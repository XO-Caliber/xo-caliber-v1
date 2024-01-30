import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

import { GetSingleQA } from "./GetSingleQA";

interface AnsTabsContentProps {
  data: any;
}

const AnsTabsContent: React.FC<AnsTabsContentProps> = ({ data }) => {
  return (
    <div>
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <GetSingleQA
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

export default AnsTabsContent;
