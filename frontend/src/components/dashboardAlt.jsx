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

export default function Dashboard(props) {
  const classes = useStyles();

  const [dataset, setDataset] = useState();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    let id = props.match.params.id;
    const url = "http://localhost:5000/v1/reports/searchReport";

    const getData = async () => {
      const response = await fetch(`${url}/${id}`);
      const data = await response.json();
      if (response.status === 206) {
        setMsg(data.msg);
      } else if (response.status === 200) {
        console.log(data.report);
        setDataset(data.report);
      }
    };

    if (id !== "") {
      getData();
    }
  }, []);

  return (
    <div className={classes.content}>
      {dataset ? (
        <>
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
        </>
      ) : (
        <>
          <h1>{msg}</h1>
          <h1>Please keep refreshing the page every few mins</h1>
        </>
      )}
    </div>
  );
}
