import React from "react";
import ReactDOM from "react-dom";
import DoughnutChart from "./../engagement-line";
import { render, cleanup } from "@testing-library/react";
import SampleData from "./../sample.json";

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<DoughnutChart dataset={SampleData}></DoughnutChart>, div);
});
