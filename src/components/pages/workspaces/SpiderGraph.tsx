"use client";
import { useEffect } from "react";
import { Chart } from "chart.js";

function SpiderGraph() {
  const data = [
    { id: 1, question: "Hey", mark: 90, category: "originality" },
    { id: 2, question: "", mark: 40, category: "humanity" },
    { id: 2, question: "", mark: 50, category: "humanity" },
    { id: 2, question: "", mark: 10, category: "humanity" },
    { id: 2, question: "", mark: 100, category: "originality" },
    { id: 3, question: "", mark: 90, category: "love" },
    { id: 3, question: "", mark: 20, category: "punctuality" },
    { id: 3, question: "", mark: 70, category: "nationality" },
    { id: 3, question: "", mark: 30, category: "sex" },
    { id: 3, question: "", mark: 90, category: "lesbian" },
    { id: 3, question: "", mark: 40, category: "a" },
    { id: 3, question: "", mark: 90, category: "e" }
  ];

  useEffect(() => {
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
    const labels = averages.map((item: any) => item.category);
    const datasets = [
      {
        data: averages.map((item: any) => item.averageMark),
        label: "Applied",
        borderColor: "#3e95cd",
        backgroundColor: "rgba(62,149,205,0.1)",
        borderWidth: 2
      }
    ];

    // Log datasets to the console
    console.log("Datasets:", datasets);

    // Radar chart configuration
    const ctx = document.getElementById("myChart").getContext("2d");
    const myChart = new Chart(ctx, {
      type: "radar",
      data: {
        labels: labels,
        datasets: datasets
      },
      options: {
        scales: {
          gridLines: {
            color: ["black", "red"]
          },
          xAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }, [data]);

  return (
    <>
      {/* Radar chart */}
      <h1 className="mx-auto mt-10 w-[110px] text-xl font-semibold capitalize ">Radar Chart</h1>
      <div className="mx-auto my-auto flex h-screen w-[1000px]">
        <div className="my-auto h-fit w-full rounded-xl  border border-red-600 pt-0  shadow-xl">
          <canvas id="myChart">myChart</canvas>
        </div>
      </div>
    </>
  );
}

export default SpiderGraph;
