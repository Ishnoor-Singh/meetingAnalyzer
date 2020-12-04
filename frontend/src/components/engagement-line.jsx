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

/**
 * The LineChart component visualizes the engagement score of meeting participants
 * over time. It shows a Line component imported from react-chartjs-2.
 * 
 * It uses the json file passed from the Dashboard component using props.
 * The json file is parsed and the labels field is used as the timestamps of the
 * chart and the data field is used as the data points.
 */
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
