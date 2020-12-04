import DoughnutChart from './../engagement-doughnut';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { ExpansionPanelActions } from '@material-ui/core';

describe.only('Components / Upload', () => {
    let ctx;

    beforeEach(() => {
        ctx = render(<DoughnutChart/>)
    });
    
    it('Should render the component', () => {
        expect(ctx.getByTestId('doughnut')).not.toBeNull()
    });
});