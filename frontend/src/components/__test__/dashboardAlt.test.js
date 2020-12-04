import Dashboard from './../dashboardAlt';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import SampleData from "./../sample.json";
import { ExpansionPanelActions } from '@material-ui/core';

describe('Components / Upload', () => {
    let ctx;

    beforeEach(() => {
        ctx = render(<Dashboard dataset={SampleData}/>)
    });

    it('Should render the component', () => {
        expect(ctx.getByTestId('dashboard')).not.toBeNull()
    });
});

// import React from "react";
// import ReactDOM from "react-dom";
// import Dashboard from "./../dashboardAlt";
// import { render, cleanup } from "@testing-library/react";
// import SampleData from "./../sample.json";

// afterEach(cleanup);
// Enzyme.configure({ adapter: new Adapter() })

// test("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Dashboard></Dashboard>, div);
// });

// it("should render LineChart and DoughnutChart", () => {
//   const dashboard = shallow(<Dashboard></Dashboard>);
//   dashboard.setState({ dataset: SampleData });
// });