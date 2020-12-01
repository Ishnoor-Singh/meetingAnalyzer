import React from "react";
import logo from "./logo.svg";
import "./App.css";
import Dashboard from "./components/dashboard";
import DropzoneDialog from "./components/upload";

function App() {
  return (
    <div className="App">
      <DropzoneDialog></DropzoneDialog>
    </div>
  );
}

export default App;
