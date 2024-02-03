import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

import { ViewClientQA } from "./ViewClientQA";

interface AnsTabsContentProps {
  data: any;
  userId: string;
}

const ClientTabsContent: React.FC<AnsTabsContentProps> = ({ data, userId }) => {
  return (
    <div className="m-4">
      {data.map((category: any, index: any) => (
        <TabsContent key={index} value={category.name}>
          {category.questions.map((question: any, questionIndex: any) => (
            <ViewClientQA
              key={questionIndex}
              questionNumber={questionIndex + 1}
              question={question.question}
              mark={question.mark}
              questionId={question.id}
              userId={userId}
            />
          ))}
        </TabsContent>
      ))}
    </div>
  );
};

export default ClientTabsContent;
