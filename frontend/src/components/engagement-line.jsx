import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles, Paper, Typography } from "@material-ui/core";
import SampleData from "./sample.json";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    marginLeft: 8,
    marginBottom: 16,
  },
}));

export default function LineChart(props) {
  const classes = useStyles();

  let dataset = SampleData;
  if(props.dataset) {
    dataset = props.dataset;
  }

  const data = {
    labels: dataset.labels,
    datasets: [
      {
        label: dataset.name,
        data: dataset.data,
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

  return (
    <Paper data-testid="line" elevation={0}>
      <Typography className={classes.title} variant="h5">
        Engagement
      </Typography>

      <Line data={data} options={options} />
    </Paper>
  );
}
