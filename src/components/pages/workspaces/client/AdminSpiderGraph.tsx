"use client";
import { useEffect } from "react";
import Image from "next/image";
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale
} from "chart.js";
import { trpc } from "@/app/_trpc/client";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/Resizable";
import { ClientQANotes } from "../../q&a/client/ClientQANotes";
import XOCaliber from "../../../../../public/images/black Logo@500x8.png";

interface UserAnswer {
  category: string | null;
  mark: number | null;
  id: string;
  answer: string; // Change this to match your $Enums.Answers type
  questionId: string;
  userId: string;
}

function getRandomColor() {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function AdminSpiderGraph() {
  const { data: answerData, isLoading, isError } = trpc.answer.getAdminSpiderAnswer.useQuery();
  const { data: adminQuestions } = trpc.question.getClientAdminQuestions.useQuery();

  useEffect(() => {
    if (isLoading) {
      // Data is still loading, do nothing
      return;
    }

    if (isError) {
      // Error occurred while fetching data, handle error
      console.error("Error fetching data:");
      return;
    }
    if (!answerData || !adminQuestions) {
      // Data is undefined, handle accordingly
      console.error("Data is undefined.");
      return;
    }

    const userAnswersWithCategory: UserAnswer[] = answerData.map((item: any) => ({
      category: item.category,
      mark: item.mark,
      id: item.id,
      answer: item.answer,
      questionId: item.questionId,
      userId: item.userId
    }));

    const canvas = document.getElementById("myChart") as HTMLCanvasElement;

    if (!canvas) {
      console.error("Canvas element with ID 'myChart' not found.");
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      console.error("Unable to get 2D rendering context for the canvas.");
      return;
    }

    Chart.register(RadialLinearScale, RadarController, PointElement, LineElement, Filler);

    const groupedData = answerData.reduce((acc: any, item: any) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      if (item.answer === "YES") {
        acc[item.category].push(item.mark / 100);
      } else {
        acc[item.category].push(0);
      }
      return acc;
    }, {});

    // Calculating average mark based on the number of questions in each category
    const averages = Object.entries(groupedData).map(([category, marks]: any) => {
      // Find the corresponding category in firmAnswer
      const categoryInfo = adminQuestions.find((answer) => answer.name === category);
      if (!categoryInfo) return { category, averageMark: 0 };

      const questionsCount = categoryInfo.questions.length;
      const averageMark =
        (marks.reduce((sum: number, mark: number) => sum + mark, 0) / questionsCount) * 10 > 10
          ? 10
          : (marks.reduce((sum: number, mark: number) => sum + mark, 0) / questionsCount) * 10;

      return { category, averageMark };
    });

    // Extract labels and datasets from averages
    Chart.defaults.backgroundColor = "#ff0000";
    const labels = averages.map((item: any) => item.category);
    const datasets = [
      {
        data: averages.map((item: any) => item.averageMark),
        label: "Applied",
        fill: true,
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgb(255, 99, 132)",
        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        pointRadius: 4
      }
    ];

    // Radar chart configuration
    const myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        layout: { padding: 50 },
        scales: {
          r: {
            grid: {
              color: "black" // Set the color of the gridlines
            },

            min: 0,
            max: 10,

            ticks: {
              stepSize: 2,
              callback: (value: any) => `L${value / 2}` // Customize tick labels
            }
          }
        }
      }
    });
    return () => {
      // Clean up the chart on component unmount
      myChart.destroy();
    };
  }, [answerData, adminQuestions]);

  return (
    <>
      {/* Radar chart */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[91vh] max-w-full">
        <ResizablePanel defaultSize={70} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={100} className="m-3 ">
              <main className="flex h-full flex-col p-3">
                {" "}
                <div className="rounded-md bg-gray-200 p-2 text-center text-xs font-bold">
                  <p>
                    Please reach out to the XO Caliber team at
                    <a href="mailto:insight@xocaliber.tech" className="ml-1 text-sky-600 underline">
                      insight@xocaliber.tech
                    </a>
                    .
                  </p>
                  <p>
                    To help you understand the Spider graph. Use your registered email to send your
                    queries, and you will receive a response within 48 hours.
                  </p>
                  <p>
                    For privacy and security reasons, no one cannot view your answers to yes or no
                    questions. Therefore, please write your queries in detail to receive
                    comprehensive insights about your Spider graph“ in Assess page below graph.
                  </p>
                </div>
                <div className="relative m-2 flex h-[65vh] items-center justify-center rounded-xl border border-red-600 bg-secondary">
                  <canvas id="myChart">myChart</canvas>
                  <Image
                    src={XOCaliber}
                    alt="Overlay"
                    width={220}
                    height={50}
                    className="pointer-events-none absolute left-0 top-0 mr-12 h-full w-full  opacity-10"
                    unoptimized
                  />
                </div>
              </main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={40} className="m-3">
              <ClientQANotes />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default AdminSpiderGraph;
