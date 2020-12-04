import Upload from './../upload';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { ExpansionPanelActions } from '@material-ui/core';

describe('Components / Upload', () => {
    let ctx;

    beforeEach(() => {
        ctx = render(<Upload/>)
    });

    it('Should render the component', () => {
        expect(ctx.getByTestId('upload')).not.toBeNull()
    });
});


// import React from "react";
// import ReactDOM from "react-dom";
// import Upload from "./../upload";
// import { render, cleanup } from "@testing-library/react";

// afterEach(cleanup);

// test("renders without crashing", () => {
//   const div = document.createElement("div");
//   ReactDOM.render(<Upload></Upload>, div);
// });
