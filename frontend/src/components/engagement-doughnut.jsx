import React from "react";
import { Doughnut } from 'react-chartjs-2';
import SampleData from "./sample.json";


var total = 0;
for(var i = 0; i < SampleData.data.length; i++) {
    total += SampleData.data[i];
}
var engagementScore = Math.round(total / SampleData.data.length);
var unengagedScore = 100 - engagementScore;


const data = {
  labels: [
    'Green',
    'Red'
  ],
  datasets: [{
    data: [engagementScore, unengagedScore],
    backgroundColor: [
    '#006400',
    '#800000',
    ],
    hoverBackgroundColor: [
    '#006400',
    '#800000',
    ]
  }]
};

const DoughnutChart = () => (
  <>
    <div>
        <h2>Engagement Summary</h2>
        <div>Engagement score: {engagementScore}</div>
        <Doughnut data={data} />
        <div>The above chart summarizes how engaged participants were throughout the meeting.</div>
      </div>
  </>
);

export default DoughnutChart;
