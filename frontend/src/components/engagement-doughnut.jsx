import React from "react";
import { Doughnut } from "react-chartjs-2";
import SampleData from "./sample.json";

var total = 0;
for (var i = 0; i < SampleData.data.length; i++) {
  total += SampleData.data[i];
}
var engagementScore = Math.round(total / SampleData.data.length);
var unengagedScore = 100 - engagementScore;

var engagementMessage = "";
if( engagementScore >= 80) {
  engagementMessage = "Strong engagement"
}
else if( engagementScore >= 60) {
  engagementMessage = "Decent engagement"
}
else if( engagementScore >= 40) {
  engagementMessage = "Mediocre engagement"
}
else if( engagementScore >= 20) {
  engagementMessage = "Low engagement"
}
else {
  engagementMessage = "Little engagement"
}

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
      <h2>{engagementMessage}</h2>
    </div>
  </>
);

export default DoughnutChart;
