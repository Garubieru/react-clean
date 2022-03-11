import React from 'react';
import { render, screen } from '@testing-library/react';

import { mockSurvey } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases';
import { IconStatus } from '../survey-icon-status';
import SurveyItem from '.';

const createSut = (
  loading: boolean = false,
  surveyData: LoadSurveyList.Model = mockSurvey(),
): void => {
  render(<SurveyItem loading={loading} surveyData={surveyData} />);
};

describe('SurveyItem Component', () => {
  it('Should be empty if SurveyItem is loading', () => {
    createSut(true);
    expect(screen.getByTestId('survey-item').childElementCount).toBe(0);
  });

  it('Should render SurveyItem with correct surveyData if survey is answered', () => {
    const surveyData = mockSurvey();
    surveyData.didAnswer = false;
    surveyData.date = new Date('02-10-2020');
    createSut(false, surveyData);
    expect(screen.getByTestId('icon-wrapper')).toHaveClass('warning');
    expect(screen.getByTestId('icon-image')).toHaveAttribute(
      'src',
      IconStatus.thumbsDown,
    );
    expect(screen.getByTestId('survey-question')).toHaveTextContent(surveyData.question);
    expect(screen.getByTestId('day')).toHaveTextContent('10');
    expect(screen.getByTestId('month')).toHaveTextContent('fev');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });

  it('Should render SurveyItem with correct surveyData if survey is not answered', () => {
    const surveyData = mockSurvey();
    surveyData.didAnswer = true;
    surveyData.date = new Date('09-01-2020');
    createSut(false, surveyData);
    expect(screen.getByTestId('icon-wrapper')).toHaveClass('success');
    expect(screen.getByTestId('icon-image')).toHaveAttribute('src', IconStatus.thumbsUp);
    expect(screen.getByTestId('survey-question')).toHaveTextContent(surveyData.question);
    expect(screen.getByTestId('day')).toHaveTextContent('01');
    expect(screen.getByTestId('month')).toHaveTextContent('set');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
  });
});
