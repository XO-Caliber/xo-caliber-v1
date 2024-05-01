"use client";
import { useEffect, useState } from "react";
import {
  Chart,
  Filler,
  LineElement,
  PointElement,
  RadarController,
  RadialLinearScale
} from "chart.js";
import { trpc } from "@/app/_trpc/client";
import AllUserSelectList from "./AllUserSelectList";
import { Copyright } from "lucide-react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";

interface UserAnswer {
  category: string | null;
  mark: number | null;
  id: string;
  answer: string; // Change this to match your $Enums.Answers type
  questionId: string;
  userId: string;
}
interface userType {
  userType: string;
}

function AdminGraph({ userType }: userType) {
  const [user, setUser] = useState("");
  const [user2, setUser2] = useState("");
  const year = new Date().getFullYear();
  const {
    data: answerData,
    isLoading,
    isError
  } = trpc.answer.getClientSpiderAnswerByAdmin.useQuery(user);
  const { data: answerData2 } = trpc.answer.getClientSpiderAnswerByAdmin.useQuery(user2);
  const { data: yourQuestions } = trpc.question.getClientAdminQuestions.useQuery();
  function getSelectedUser(userData: string) {
    setUser(userData);
  }
  function getSelectedUser2(userData: string) {
    setUser2(userData);
  }

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
    if (!answerData || !yourQuestions) {
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
      const categoryInfo = yourQuestions.find((answer) => answer.name === category);
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
              color: "gray" // Set the color of the gridlines
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
  }, [answerData, yourQuestions]);

  useEffect(() => {
    if (!answerData2 || !yourQuestions) {
      // Data is undefined, handle accordingly
      console.error("Data is undefined.");
      return;
    }

    const userAnswersWithCategory: UserAnswer[] = answerData2.map((item: any) => ({
      category: item.category,
      mark: item.mark,
      id: item.id,
      answer: item.answer,
      questionId: item.questionId,
      userId: item.userId
    }));

    const canvas = document.getElementById("myChart2") as HTMLCanvasElement;

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

    const groupedData = answerData2.reduce((acc: any, item: any) => {
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
      const categoryInfo = yourQuestions.find((answer) => answer.name === category);
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
              color: "gray" // Set the color of the gridlines
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
  }, [answerData2, yourQuestions]);

  return (
    <>
      <div className="flex  items-center justify-between border-2 border-l-0">
        <p className="m-4 mt-[1.2rem] text-xl font-bold text-muted">Spider Graph</p>{" "}
        <div className="mr-72 flex items-center justify-center">
          <span className="font-bold">User 1:</span>
          <AllUserSelectList getSelectedUser={getSelectedUser} />
        </div>
        <div className="flex items-center justify-center">
          <span className="font-bold">User 2:</span>
          <AllUserSelectList getSelectedUser={getSelectedUser2} />
        </div>
      </div>
      <main className="grid h-full grid-cols-2 flex-col bg-dotted-spacing-3 bg-dotted-gray-200  md:min-h-[87vh] xl:min-h-[93vh]">
        <div className="border-2 border-y-0 border-l-0">
          <h1 className="ml-8 mt-4 text-2xl font-bold">User Graph 1:</h1>
          <div className="m-8 mb-2 flex flex-col items-center justify-center rounded-xl border  border-red-600 bg-secondary ">
            <canvas className="min-w-20" id="myChart">
              myChart
            </canvas>
          </div>
        </div>

        <div className="mt-4">
          <h1 className="ml-8 text-2xl font-bold">User Graph 2:</h1>
          <div className="m-8 flex items-center justify-center rounded-xl border border-red-600 bg-secondary ">
            <canvas className="min-w-20" id="myChart2">
              myChart
            </canvas>
          </div>
        </div>
      </main>
      {/* <div className=" flex h-[70px] items-center justify-center border-2 border-x-0 bg-gray-100">
        <div className="flex items-center justify-center space-x-1">
          <p className="text-sm font-bold">{year}</p>
          <Copyright size={16} className="font-bold" />
          <p className="text-sm font-bold">XO Caliber</p>
        </div>
      </div> */}
    </>
  );
}

export default AdminGraph;
