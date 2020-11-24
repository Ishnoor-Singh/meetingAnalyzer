import React from "react";
import { Line } from "react-chartjs-2";
import { makeStyles, Paper, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  title: {
    textAlign: "left",
    marginLeft: 8,
    marginBottom: 16,
  },
}));

export default function LineChart(props) {
  const classes = useStyles();

  const data = {
    labels: props.dataset.labels,
    datasets: [
      {
        label: props.dataset.name,
        data: props.dataset.data,
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
    <Paper elevation={0}>
      <Typography className={classes.title} variant="h5">
        Engagement
      </Typography>

      <Line data={data} options={options} />
    </Paper>
  );
}
