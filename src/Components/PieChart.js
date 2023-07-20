import React, { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart(props) {
  const [chartData, setChartData] = useState();
  const BackgroundColor = [
    "rgba(15, 131, 171, 0.5)",
    "rgba(250, 164, 58, 0.5)",
    "rgba(253, 104, 104, 0.5)",
    "rgba(83, 207, 201, 0.5)",
    "rgba(162, 217, 37, 0.5)",
    "rgba(222, 207, 63, 0.5)",
    "rgba(115, 79, 233, 0.5)",
  ];
  const BorderColor = [
    "rgba(15, 131, 171, 1)",
    "rgba(250, 164, 58, 1)",
    "rgba(253, 104, 104, 1)",
    "rgba(83, 207, 201, 1)",
    "rgba(162, 217, 37, 1)",
    "rgba(222, 207, 63, 1)",
    "rgba(115, 79, 233, 1)",
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
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Pie data={returnChart()} />
        </div>
      </>
    );
  }
}
