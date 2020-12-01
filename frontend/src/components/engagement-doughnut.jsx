import React from "react";
import { Doughnut } from "react-chartjs-2";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    marginLeft: 8,
    marginBottom: 16,
  },
}));

export default function DoughnutChart(props) {
  const classes = useStyles();

  var total = 0;
  for (var i = 0; i < props.dataset.data.length; i++) {
    total += props.dataset.data[i];
  }
  var engagementScore = Math.round(total / props.dataset.data.length);
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
