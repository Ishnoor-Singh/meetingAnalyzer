import React from "react";
import { Doughnut } from "react-chartjs-2";
import SampleData from "./sample.json";
import { makeStyles, Paper, Typography } from "@material-ui/core";

var total = 0;
for (var i = 0; i < SampleData.data.length; i++) {
  total += SampleData.data[i];
}
var engagementScore = Math.round(total / SampleData.data.length);
var unengagedScore = 100 - engagementScore;

var engagementMessage = "";
if (engagementScore >= 80) {
  engagementMessage = "Strong engagement";
} else if (engagementScore >= 60) {
  engagementMessage = "Decent engagement";
} else if (engagementScore >= 40) {
  engagementMessage = "Mediocre engagement";
} else if (engagementScore >= 20) {
  engagementMessage = "Low engagement";
} else {
  engagementMessage = "Little engagement";
}

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    marginLeft: 8,
    marginBottom: 16,
  },
}));

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

export default function DoughnutChart() {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Typography className={classes.title} variant="h5">
        Overall Engagement
      </Typography>

      <Doughnut data={data} options={options} />

      <div>
        <h2>Score: {engagementScore}</h2>
        <h2>{engagementMessage}</h2>
      </div>
    </Paper>
  );
}
