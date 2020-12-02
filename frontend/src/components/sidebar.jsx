import React from "react";
import {
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import { Dashboard } from "@material-ui/icons";
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
    </Drawer>
  );
}
