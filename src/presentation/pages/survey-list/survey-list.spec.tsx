import React from 'react';

import { render, screen } from '@testing-library/react';
import SurveyList from '.';

const createSut = (): void => {
  render(<SurveyList />);
};

describe('SurveyList Component', () => {
  it('Should render with 4 empty items on start', () => {
    createSut();
    const surveyList = screen.getByTestId('surveysList');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
