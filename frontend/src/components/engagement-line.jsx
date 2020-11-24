import React from "react";
import { Line } from "react-chartjs-2";
import SampleData from "./sample.json";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    marginLeft: 8,
    marginBottom: 16,
  },
}));

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

export default function LineChart() {
  const classes = useStyles();

  return (
    <Paper elevation={0}>
      <Typography className={classes.title} variant="h5">
        Engagement
      </Typography>

      <Line data={data} options={options} />
    </Paper>
  );
}
