import React, { Component } from "react";
import LineChart from "./engagement-line";
import DoughnutChart from "./engagement-doughnut";
import { Grid } from "@material-ui/core";

class Dashboard extends Component {
  state = {};
  render() {
    return (
      <div>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <LineChart></LineChart>
          </Grid>
          <Grid item xs={4}>
            <DoughnutChart></DoughnutChart>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
