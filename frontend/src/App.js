import React from "react";
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
