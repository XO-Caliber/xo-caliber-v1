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
import FirmNotes from "./FirmNotes";
import UserNotes from "./UserNotes";
import XOCaliber from "../../../../public/images/black Logo@500x8.png";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";

interface UserAnswer {
  category: string | null;
  mark: number | null;
  id: string;
  answer: string; // Change this to match your $Enums.Answers type
  questionId: string;
  userId: string;
}

interface userProps {
  userType: string;
}
function XOSpiderGraph({ userType }: userProps) {
  const { data: answerData, isLoading, isError } = trpc.answer.getFirmSpiderAnswer.useQuery();
  const { data: firmQuestion } = trpc.question.getClientQuestions.useQuery();

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
    if (!answerData) {
      // Data is undefined, handle accordingly
      console.error("Data is undefined.");
      return;
    }
    if (!firmQuestion) {
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

    // Grouping answer data by category
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
      const categoryInfo = firmQuestion.find((answer) => answer.name === category);
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

    // Log datasets to the console
    console.log("Datasets:", datasets);

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
  }, [answerData, firmQuestion]);

  return (
    <>
      {/* Radar chart */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[93vh] max-w-full">
        <ResizablePanel defaultSize={50} className="m-2">
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="m-3 ">
              <main className="flex h-full flex-col p-3">
                <div className="rounded-md bg-gray-200 p-2 text-center text-xs font-bold">
                  <p>
                    Please reach out to your firm to understand the Spider graph if any assistance
                    required.
                  </p>
                  <p>
                    For privacy and security reasons, no one cannot view your answers to yes or no
                    questions.
                  </p>
                </div>
                <div className="relative m-2 flex h-[65vh] items-center justify-center rounded-xl border border-red-600 bg-secondary">
                  <canvas id="myChart">myChart</canvas>{" "}
                  <Image
                    src={XOCaliber}
                    alt="Overlay"
                    width={220}
                    height={50}
                    className="pointer-events-none absolute left-0 top-0 mr-12 h-full w-full  opacity-10"
                  />
                </div>
              </main>
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="m-3">
              <FirmNotes userType={userType} />
            </ResizablePanel>
            <ResizableHandle />
            <ResizablePanel defaultSize={50} className="m-3">
              <UserNotes userType={userType} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </ResizablePanel>
      </ResizablePanelGroup>
    </>
  );
}

export default XOSpiderGraph;
