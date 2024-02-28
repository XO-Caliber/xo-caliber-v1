"use client";

import React from "react";
import { trpc } from "@/app/_trpc/client";
import { Button } from "@/components/ui/Button";
import { Save } from "lucide-react";
import { jsPDF } from "jspdf";
import "jspdf-autotable";

const DownloadAssistantQuestions = () => {
  const {
    data: categoriesList,
    isLoading,
    isError
  } = trpc.question.getAssistantFirmQuestion.useQuery();

  const exportHandler = () => {
    if (!categoriesList || categoriesList.length === 0) {
      console.error("No data available to export.");
      return;
    }

    const doc = new jsPDF();

    const tableData = categoriesList.map((category) => [
      category.name,
      category.questions.map((question) => question.question).join("\n")
    ]);
    //@ts-ignore
    doc.autoTable({
      head: [["CATEGORY", "QUESTIONS"]],
      body: tableData,
      styles: {
        font: "helvetica",
        fontSize: 12,
        cellPadding: 2,
        textColor: [0, 0, 0], // Black color
        fillColor: [255, 255, 255], // White color
        lineColor: [0, 0, 0], // Black color
        lineWidth: 0.1
      },
      headStyles: {
        fillColor: [192, 192, 192], // Light gray color for header row
        textColor: [0, 0, 0] // Black color for header row text
      }
    });

    doc.save("FirmQuestions.pdf");
  };

  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (isError || !categoriesList) {
  //     return <div>Error fetching data...</div>;
  //   }

  return (
    <div>
      <Button
        variant={"dark"}
        className="ml-4 mr-2 border-dashed border-gray-400 font-medium hover:border"
        size={"sm"}
        onClick={exportHandler}
      >
        <ul className="flex items-center justify-center space-x-1">
          <li>Download PDF</li>
          <li>
            <Save />
          </li>
        </ul>
      </Button>
    </div>
  );
};

export default DownloadAssistantQuestions;
