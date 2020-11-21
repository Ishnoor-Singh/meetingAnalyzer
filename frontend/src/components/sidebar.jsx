import React, { Component } from "react";
import { Divider, Drawer, IconButton } from "@material-ui/core";
import { AccountCircle, AddCircle, Dashboard } from "@material-ui/icons";

class Sidebar extends Component {
  state = {};

  render() {
    return (
      <Drawer variant="permanent">
        <IconButton>
          <AccountCircle />
        </IconButton>
        <Divider />
        <IconButton>
          <Dashboard />
        </IconButton>
        <Divider />
        <IconButton>
          <AddCircle />
        </IconButton>
        <Divider />
      </Drawer>
    );
  }
}

export default Sidebar;
