"use client";
import { useEffect } from "react";
import { Chart, LineElement, PointElement, RadarController, RadialLinearScale } from "chart.js";

interface DataItem {
  id: number;
  question: string;
  mark: number;
  category: string;
}

function SpiderGraph() {
  const data: DataItem[] = [
    { id: 1, question: "Hey", mark: 90, category: "originality" },
    { id: 2, question: "", mark: 40, category: "humanity" },
    { id: 2, question: "", mark: 50, category: "humanity" },
    { id: 2, question: "", mark: 10, category: "humanity" },
    { id: 2, question: "", mark: 100, category: "originality" },
    { id: 3, question: "", mark: 90, category: "love" },
    { id: 3, question: "", mark: 20, category: "punctuality" },
    { id: 3, question: "", mark: 70, category: "nationality" },
    { id: 3, question: "", mark: 30, category: "f" },
    { id: 3, question: "", mark: 90, category: "Productivity" }
  ];

  useEffect(() => {
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

    Chart.register(RadialLinearScale, RadarController, PointElement, LineElement);

    // Group data by category
    const groupedData = data.reduce((acc: any, item) => {
      if (!acc[item.category]) {
        acc[item.category] = [];
      }
      acc[item.category].push(item.mark);
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
        borderColor: "rgb(255, 99, 132)",

        pointBackgroundColor: "rgb(255, 99, 132)",
        pointBorderColor: "rgb(255, 99, 132)",
        pointHoverBackgroundColor: "rgb(255, 99, 132)",
        pointHoverBorderColor: "rgb(255, 99, 132)",
        borderWidth: 2
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
              stepSize: 20
            }
          }
        }
      }
    });
    return () => {
      // Clean up the chart on component unmount
      myChart.destroy();
    };
  }, [data]);

  return (
    <>
      {/* Radar chart */}

      <div className="mx-auto my-auto flex">
        <div className="my-auto h-[570px] w-[570px] rounded-xl  border border-red-600   shadow-xl">
          <canvas id="myChart">myChart</canvas>
        </div>
      </div>
    </>
  );
}

export default SpiderGraph;
