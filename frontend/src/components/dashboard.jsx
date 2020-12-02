import React, { useState, useEffect } from "react";
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

  const [idname, setIdname] = useState("5fc684d4c805294253b7ec6f");
  const [dataset, setDataset] = useState(SampleData);

  useEffect(() => {
    const url = "http://localhost:5000/v1/reports/searchReport";


    const getData = async () => {
      const response = await fetch(`${url}/${idname}`);
      const data = await response.json();
      console.log(data.report)
      setDataset(data.report);

    };

    if (idname !== "") {
      getData();
    }
  }, [idname]);

  return (
    <div className={classes.content}>
      <Sidebar></Sidebar>

      <Typography className={classes.title} variant="h4">
        Dashboard
      </Typography>

      <Grid container spacing={16}>
        <Grid item component={Card} xs={8}>
          <CardContent>
            <LineChart dataset={dataset}></LineChart>
          </CardContent>
        </Grid>
        <Grid item component={Card} xs={4}>
          <CardContent>
            <DoughnutChart dataset={dataset}></DoughnutChart>
          </CardContent>
        </Grid>
      </Grid>
    </div>
  );
}
