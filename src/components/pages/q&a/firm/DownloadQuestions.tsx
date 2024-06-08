"use client";

import React, { useState } from "react";
import { trpc } from "@/app/_trpc/client";
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
  const { data: categoriesList, isLoading, isError } = trpc.question.getFirmQuestions.useQuery();
  const [type, setType] = useState("");
  const handleChange = (type: string) => {
    setType(type);
    type === "xlsx" && exportExcelHandler();
    setType("");
  };
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

  return (
    <div>
      <Select value={type} onValueChange={handleChange}>
        <SelectTrigger>
          <SelectValue placeholder="Export as" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="xlsx">Excel sheet</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default DownloadAdminQuestions;
