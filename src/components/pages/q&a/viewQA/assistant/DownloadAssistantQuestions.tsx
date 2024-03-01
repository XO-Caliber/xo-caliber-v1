"use client";

import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import ExcelJS from "exceljs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/Select";
const DownloadAdminQuestions = () => {
  const {
    data: categoriesList,
    isLoading,
    isError
  } = trpc.question.getAssistantFirmQuestion.useQuery();
  const [type, setType] = useState("");
  const handleChange = (type: string) => {
    setType(type);
    // type === "pdf" && exportHandler();
    type === "xlsx" && exportExcelHandler();
    setType("");
  };
  // const exportHandler = () => {
  //   if (!categoriesList || categoriesList.length === 0) {
  //     console.error("No data available to export.");
  //     return;
  //   }

  //   const doc = new jsPDF();

  //   const tableData = categoriesList.map((category) => [
  //     category.name,
  //     category.questions.map((question) => question.question).join("\n"),
  //     category.questions.map((question) => question.mark).join("\n")
  //   ]);
  //   //@ts-ignore
  //   doc.autoTable({
  //     head: [["CATEGORY", "QUESTIONS", "WEIGHTAGE"]],
  //     body: tableData,
  //     styles: {
  //       font: "helvetica",
  //       fontSize: 12,
  //       cellPadding: 2,
  //       textColor: [0, 0, 0], // Black color
  //       fillColor: [255, 255, 255], // White color
  //       lineColor: [0, 0, 0], // Black color
  //       lineWidth: 0.1
  //     },
  //     headStyles: {
  //       fillColor: [192, 192, 192], // Light gray color for header row
  //       textColor: [0, 0, 0] // Black color for header row text
  //     }
  //   });

  //   doc.save("AdminQuestions.pdf");
  // };
  const exportExcelHandler = () => {
    if (!categoriesList || categoriesList.length === 0) {
      console.error("No data available to export.");
      return;
    }

    // Create a new workbook
    const workbook = new ExcelJS.Workbook();

    // Add a worksheet
    const worksheet = workbook.addWorksheet("AdminQuestions");

    // Add header row
    worksheet.addRow(["CATEGORY", "QUESTIONS", "WEIGHTAGE"]);

    // Iterate over categories
    categoriesList.forEach((category) => {
      const categoryName = category.name;
      const categoryQuestions = category.questions;

      // Add category row
      worksheet.addRow([categoryName]);

      // Add questions for this category
      categoryQuestions.forEach((question) => {
        worksheet.addRow(["", question.question, question.mark]);
      });

      // Add an empty row as a separator between categories
      worksheet.addRow([]);
    });

    // Generate Excel file
    workbook.xlsx.writeBuffer().then((buffer) => {
      // Convert buffer to Blob
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);

      // Create anchor element
      const a = document.createElement("a");
      a.href = url;
      a.download = "AdminQuestions.xlsx";

      // Trigger download
      a.click();

      // Clean up
      window.URL.revokeObjectURL(url);
    });
  };
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  //   if (isError || !categoriesList) {
  //     return <div>Error fetching data...</div>;
  //   }

  return (
    <div>
      <Select value={type} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Export as" />
        </SelectTrigger>
        <SelectContent>
          {/* <SelectItem value="pdf">Pdf</SelectItem> */}
          <SelectItem value="xlsx">Excel sheet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DownloadAdminQuestions;
