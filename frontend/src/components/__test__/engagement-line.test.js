import LineChart from './../engagement-line';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { ExpansionPanelActions } from '@material-ui/core';

describe('Components / LineChart', () => {
    let ctx;

    beforeEach(() => {
        ctx = render(<LineChart/>)
    });
    
    it('Should render the component', () => {
        expect(ctx.getByTestId('line')).not.toBeNull()
    });
});

// import React from "react";
// import ReactDOM from "react-dom";
// import LineChart from "./../engagement-line";
// import { render, cleanup } from "@testing-library/react";
// import SampleData from "./../sample.json";

// afterEach(cleanup);

// test("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<LineChart dataset={SampleData}></LineChart>, div);
// });
