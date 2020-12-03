import React from "react";
import ReactDOM from "react-dom";
import LineChart from "./../engagement-line";
import { render, cleanup } from "@testing-library/react";
import SampleData from "./../sample.json";

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<LineChart dataset={SampleData}></LineChart>, div);
});
