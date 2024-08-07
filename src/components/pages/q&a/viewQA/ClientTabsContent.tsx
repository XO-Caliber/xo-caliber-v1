import { TabsContent } from "@radix-ui/react-tabs";
import React from "react";

import { ViewClientQA } from "./ViewClientQA";
import { trpc } from "@/app/_trpc/client";

interface ClientTabsContentProps {
  data:
    | {
        name: string;
        id: string;
        firmId: string | null;
        adminId: string | null;
        questions: {
          id: string;
          categoryId: string;
          question: string;
          mark: number;
        }[];
      }[]
    | undefined;
  userId: string;
}

const ClientTabsContent: React.FC<ClientTabsContentProps> = ({ data, userId }) => {
  const getuserAnswer = trpc.answer.getUserAnswer.useQuery({ userId });
  const { data: userAnswer } = getuserAnswer;
  const reFetch = () => {
    getuserAnswer.refetch();
  };

  const userAnswerMap = new Map();
  if (userAnswer) {
    userAnswer.forEach((answer) => {
      userAnswerMap.set(answer.questionId, answer.answer);
    });
  }

  return (
    <div className="m-4">
      {data &&
        data.map((category: any, index: any) => (
          <TabsContent key={index} value={category.name}>
            {category.questions.map((question: any, questionIndex: any) => {
              // Get the user's answer for the current question
              const userAnswerForQuestion = userAnswerMap.get(question.id) || "";

              // Combine the question data with the user's answer
              const mergedQuestion = {
                ...question,
                userAnswer: userAnswerForQuestion
              };

              return (
                <ViewClientQA
                  key={questionIndex}
                  questionNumber={questionIndex + 1}
                  question={mergedQuestion.question}
                  mark={mergedQuestion.mark}
                  questionId={mergedQuestion.id}
                  userId={userId}
                  userAnswer={mergedQuestion.userAnswer}
                  refetch={reFetch}
                />
              );
            })}
          </TabsContent>
        ))}
    </div>
  );
};

export default ClientTabsContent;
