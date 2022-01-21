import React from 'react';

import { render, screen } from '@testing-library/react';
import SurveyItem from '.';
import { mockSurvey } from '@/domain/test';
import { SurveyModel } from '@/domain/models';
import { IconStatus } from '../survey-icon-status';

const createSut = (
  loading: boolean = false,
  surveyData: SurveyModel = mockSurvey(),
): HTMLElement => {
  render(<SurveyItem loading={loading} surveyData={surveyData} />);
  return screen.getByTestId('survey-item');
};

const getSurveyElement = (elName: string): HTMLElement => {
  return screen.getByTestId('survey-item').querySelector(`.survey${elName}`);
};

const testSurveyElement = (surveyData: SurveyModel): void => {
  createSut(false, surveyData);
  const surveyDate = surveyData.date;

  expect(getSurveyElement('Icon')).toHaveClass(
    surveyData.didAnswer ? 'success' : 'warning',
  );
  expect(screen.getByTestId('icon-image')).toHaveAttribute(
    'src',
    surveyData.didAnswer ? IconStatus.thumbsUp : IconStatus.thumbsDown,
  );
  expect(getSurveyElement('Day')).toHaveTextContent(surveyDate.getDay().toString());
  expect(getSurveyElement('Month')).toHaveTextContent(surveyDate.getMonth().toString());
  expect(getSurveyElement('Year')).toHaveTextContent(surveyDate.getFullYear().toString());
  expect(getSurveyElement('Question')).toHaveTextContent(surveyData.question);
};

describe('SurveyItem Component', () => {
  it('Should be empty if SurveyItem is loading', () => {
    createSut(true);
    const surveyItem = screen.getByTestId('survey-item');
    expect(surveyItem.childElementCount).toBe(0);
  });

  it('Should render SurveyItem with correct surveyData if survey is answered', () => {
    const surveyData = mockSurvey(2);
    surveyData.didAnswer = false;
    testSurveyElement(surveyData);
  });

  it('Should render SurveyItem with correct surveyData if survey is not answered', () => {
    const surveyData = mockSurvey(2);
    surveyData.didAnswer = true;
    testSurveyElement(surveyData);
  });
});
