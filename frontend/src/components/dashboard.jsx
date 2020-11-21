import React, { Component } from "react";
import LineChart from "./engagement-line";
import DoughnutChart from "./engagement-doughnut";
import { Grid, Card } from "@material-ui/core";
import Sidebar from "./sidebar";

class Dashboard extends Component {
  state = {};

  render() {
    return (
      <div>
        <Sidebar></Sidebar>
        <h1>Dashboard</h1>
        <Grid container spacing={3}>
          <Grid item xs={8}>
            <Card>
              <LineChart></LineChart>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card>
              <DoughnutChart></DoughnutChart>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Dashboard;
