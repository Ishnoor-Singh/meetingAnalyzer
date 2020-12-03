import React from "react";
import ReactDOM from "react-dom";
import Upload from "./../upload";
import { render, cleanup } from "@testing-library/react";

afterEach(cleanup);

test("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Upload></Upload>, div);
});
