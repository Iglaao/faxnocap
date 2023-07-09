import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const [chartData, setChartData] = useState();
  const BackgroundColor = [
    "rgba(255, 0, 0, 0.5)",
    "rgba(255, 255, 0, 0.5)",
    "rgba(0, 255, 255, 0.5)",
    "rgba(0, 0, 255, 0.5)",
    "rgba(0, 128, 0, 0.5)",
    "rgba(128, 0, 128, 0.5)",
    "rgba(128, 128, 128, 0.5)",
  ];
  const BorderColor = [
    "rgba(255, 0, 0, 1)",
    "rgba(255, 255, 0, 1)",
    "rgba(0, 255, 255, 1)",
    "rgba(0, 0, 255, 1)",
    "rgba(0, 128, 0, 1)",
    "rgba(128, 0, 128, 1)",
    "rgba(128, 128, 128, 1)",
  ];

  function mapPveData() {
    var map = new Map();
    var other = 0;
    Object.entries(props.values).forEach((element) => {
      if (element[0] !== "Total") {
        other += element[1];
        map.set(element[0], element[1]);
      }
    });
    map.set("Other", props.values.Total - other);
    setChartData(map);
  }

  function mapGatheringData() {
    var map = new Map();
    Object.entries(props.values.Gathering).forEach((element) => {
      if (element[0] !== "All") {
        map.set(element[0], element[1].Total);
      }
    });
    map.set("Fishing", props.values.FishingFame);
    setChartData(map);
  }

  function setData() {
    if (props.type === "pve") mapPveData();
    else mapGatheringData();
  }

  function returnChart() {
    return {
      labels: Array.from(chartData.keys()),
      datasets: [
        {
          data: Array.from(chartData.values()),
          backgroundColor: BackgroundColor,
          borderColor: BorderColor,
          borderWidth: 1,
        },
      ],
    };
  }

  useEffect(() => {
    setData();
  }, []);

  if (chartData) {
    return (
      <>
        <div
          style={{
            width: "400px",
            height: "300px",
          }}
        >
          <Pie data={returnChart()} />
        </div>
      </>
    );
  }
}
