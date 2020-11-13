import React from "react";
import { Doughnut } from "react-chartjs-2";
import SampleData from "./sample.json";

var total = 0;
for (var i = 0; i < SampleData.data.length; i++) {
  total += SampleData.data[i];
}
var engagementScore = Math.round(total / SampleData.data.length);
var unengagedScore = 100 - engagementScore;

const data = {
  labels: ["Engaged", "Not Engaged"],
  datasets: [
    {
      data: [engagementScore, unengagedScore],
      backgroundColor: ["#4072EE", "#9F9F9F"],
      hoverBackgroundColor: ["#4072EE", "#9F9F9F"],
    },
  ],
};

const options = {
  legend: {
    display: false,
  },
};

const DoughnutChart = () => (
  <>
    <div className="header">
      <h1 className="title">Overall Engagement</h1>
    </div>
    <Doughnut data={data} options={options} />
    <div>
      <h2>Score: {engagementScore}</h2>
      <p>
        The above chart summarizes how engaged participants were throughout the
        meeting
      </p>
    </div>
  </>
);

export default DoughnutChart;
