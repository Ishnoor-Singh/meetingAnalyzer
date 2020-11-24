import React from "react";
import LineChart from "./engagement-line";
import DoughnutChart from "./engagement-doughnut";
import {
  Grid,
  Card,
  makeStyles,
  Typography,
  CardContent,
} from "@material-ui/core";
import Sidebar from "./sidebar";
import SampleData from "./sample.json";

const drawerWidth = 208;

const useStyles = makeStyles((theme) => ({
  content: {
    marginLeft: drawerWidth + 16,
  },
  title: {
    marginTop: 16,
    marginBottom: 16,
    textAlign: "left",
  },
}));

export default function Dashboard() {
  const classes = useStyles();

  return (
    <div className={classes.content}>
      <Sidebar></Sidebar>

      <Typography className={classes.title} variant="h4">
        Dashboard
      </Typography>

      <Grid container spacing={16}>
        <Grid item component={Card} xs={8}>
          <CardContent>
            <LineChart dataset={SampleData}></LineChart>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={4}>
          <CardContent>
            <DoughnutChart dataset={SampleData}></DoughnutChart>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}
