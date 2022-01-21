import React from 'react';

import { render, screen } from '@testing-library/react';
import SurveyList from '.';

describe('SurveyList Component', () => {
  it('Should render with 4 empty items on start', () => {
    render(<SurveyList />);
    const surveyList = screen.getByTestId('surveysList');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });
});
