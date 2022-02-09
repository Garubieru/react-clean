import { render, screen } from '@testing-library/react';
import React from 'react';
import Calendar from '.';

const createSut = (date: Date): void => {
  render(<Calendar time={date}></Calendar>);
};

describe('Calendar', () => {
  it('Should render correct calendar date', () => {
    createSut(new Date('02-10-2020'));
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('fev');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  it('Should render correct calendar date', () => {
    createSut(new Date('03-01-2019'));
    expect(screen.getByTestId('day')).toHaveTextContent('01');
    expect(screen.getByTestId('month')).toHaveTextContent('mar');
    expect(screen.getByTestId('year')).toHaveTextContent('2019');
  });
});
