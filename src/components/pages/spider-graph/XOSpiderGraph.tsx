import { useEffect } from "react";
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
        acc[item.category].push(item.mark);
      } else {
        acc[item.category].push(0);
      }
      return acc;
    }, {});

    // Calculate average marks for each category
    const averages = Object.entries(groupedData).map(([category, marks]: any) => {
      const averageMark = marks.reduce((sum: number, mark: number) => sum + mark, 0) / marks.length;
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
              color: "gray" // Set the color of the gridlines
            },

            min: 0,
            max: 100,
            ticks: {
              stepSize: 20,
              callback: (value: any) => `L${value / 20}` // Customize tick labels
            }
          }
        }
      }
    });
    return () => {
      // Clean up the chart on component unmount
      myChart.destroy();
    };
  }, [answerData]);

  return (
    <>
      {/* Radar chart */}
      <ResizablePanelGroup direction="horizontal" className="min-h-[90vh] max-w-full">
        <ResizablePanel defaultSize={50} className="m-2">
          <main className="flex h-full flex-col p-3">
            <div className="flex items-center justify-between">
              {/* <div className="px-4">
                <h1 className="text-2xl font-bold">Welcome back!</h1>
                <p className="text-sm font-normal text-muted">
                  Here’s a list of Bonny davis’s cases
                </p>
              </div> */}
            </div>
            <div className="m-2 h-[70vh] rounded-xl border border-red-600">
              <canvas id="myChart">myChart</canvas>
            </div>
          </main>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={50}>
          <ResizablePanelGroup direction="vertical">
            <ResizablePanel defaultSize={50} className="m-3">
              <FirmNotes userType={userType} />
            </ResizablePanel>
            <ResizableHandle withHandle />
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
