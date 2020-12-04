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

// NOTE: This component is not used. What is used is DashboardAlt.jsx

/**
 * The Dashboard component is what the user sees after uploading a video to the Upload
 * component. It contains an instance of the LineChart and DoughnutChart components.
 */
export default function Dashboard() {
  const classes = useStyles();

  const [idname, setIdname] = useState("5fc684d4c805294253b7ec6f");
  const [dataset, setDataset] = useState(SampleData);

  useEffect(() => {
    const url = "http://localhost:5000/v1/reports/searchReport";

    /**
     * To get the data from the backend API, the Dashboard component does a GET request
     * to the endpoint /v1/reports/searchReport/:id where the id is passed from the
     * Upload component using props. After receiving a response from the API, the data
     * is sent for visualization to the LineChart and DoughnutChart components using
     * props in the form of a json file.
     */
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
