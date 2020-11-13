import React from "react";
import { Line } from "react-chartjs-2";
import SampleData from "./sample.json";

const data = {
  labels: SampleData.labels,
  datasets: [
    {
      label: SampleData.name,
      data: SampleData.data,
      fill: false,
      backgroundColor: "#4072EE",
      borderColor: "#4072EE",
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true,
        },
      },
    ],
  },
};

const LineChart = () => (
  <>
    <div className="header">
      <h1 className="title">Engagement</h1>
    </div>
    <Line data={data} options={options} />
  </>
);

export default LineChart;
