import React from "react";
import logo from "./logo.svg";
import "./App.css";
import LineChart from "./components/engagement-line";
import DoughnutChart from "./components/engagement-doughnut";

function App() {
  return (
    <div className="App">
      <LineChart></LineChart>
      <DoughnutChart></DoughnutChart>
    </div>
  );
}

export default App;
