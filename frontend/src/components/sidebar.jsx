import React from "react";
import {
  Button,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { CloudUpload, Dashboard } from "@material-ui/icons";
import { makeStyles } from "@material-ui/core/styles";

const drawerWidth = 208;

const useStyles = makeStyles((theme) => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: {
    position: "relative",
    top: 16,
  },
  upload: {
    margin: theme.spacing(1),
    position: "relative",
    top: 616,
  },
}));

export default function Sidebar(props) {
  const classes = useStyles(props);

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{ paper: classes.drawerPaper }}
      anchor="left"
    >
      <h1>Viber</h1>
      <Divider />

      <List className={classes.toolbar}>
        <ListItem button>
          <ListItemIcon>
            <Dashboard />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
      </List>

      <Button
        className={classes.upload}
        variant="contained"
        color="primary"
        startIcon={<CloudUpload />}
      >
        UPLOAD
      </Button>
    </Drawer>
  );
}
