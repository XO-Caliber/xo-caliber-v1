"use client";
import { GetSingleQA } from "@/components/pages/q&a/GetSingleQA";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs";
import React from "react";

export const GetListQA = () => {
  const [selectedTab, setSelectedTab] = React.useState("originality");
  const handleChange = (value: string) => {
    setSelectedTab(value);
  };
  try {
    const data = [
      {
        category: "originality",
        questions: [
          "Have you independently contributed to original research that has gained national and/or international recognition over the past five years?",

          "Did you publish publicly available outputs, such as books, papers, and conference papers, as the principal author during the specified 5-year period?",
          "Have you been externally awarded research grants and funding as a principal investigator in the last 5 years?",
          "Have you held staff responsibilities, including managing research staff, both currently and in previous roles?",
          "Have you managed and graduated doctoral students in your current role?"
        ]
      },
      {
        category: "leadership",
        questions: [
          "Have you independently contributed to original research that has gained national and/or international recognition over the past five years?",

          "Did you publish publicly available outputs, such as books, papers, and conference papers, as the principal author during the specified 5-year period?",
          "Have you been externally awarded research grants and funding as a principal investigator in the last 5 years?",
          "Have you held staff responsibilities, including managing research staff, both currently and in previous roles?",
          "Have you managed and graduated doctoral students in your current role?",
          "Are you gay"
        ]
      }
    ];

    const filteredQuestions = data.find((set) => set.category === selectedTab)?.questions || [];

    return (
      <div className="relative right-[550px]  m-24 flex items-center justify-center">
        <Tabs
          defaultValue="originality"
          className="flex  w-[200px] flex-col"
          onValueChange={handleChange}
        >
          <div className="flex items-center justify-center">
            <TabsList className="mb-12">
              <TabsTrigger value="originality">Originality</TabsTrigger>
              <TabsTrigger value="leadership">Leadership</TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value="originality">
            {filteredQuestions.map((question, questionIndex) => (
              <GetSingleQA
                key={questionIndex}
                question={question}
                questionNumber={questionIndex + 1}
              />
            ))}
          </TabsContent>
          <TabsContent value="leadership">
            {filteredQuestions.map((question, questionIndex) => (
              <GetSingleQA
                key={questionIndex}
                question={question}
                questionNumber={questionIndex + 1}
              />
            ))}
          </TabsContent>
        </Tabs>
      </div>
    );
  } catch (error) {
    console.error("Error fetching session:", error);
    // Handle errors if necessary
    return <div>Error loading data</div>;
  }
};
