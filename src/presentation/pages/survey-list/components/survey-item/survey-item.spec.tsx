import React from 'react';

import { render, screen } from '@testing-library/react';
import { mockSurvey } from '@/domain/test';
import { SurveyModel } from '@/domain/models';

import { IconStatus } from '../survey-icon-status';
import SurveyItem from '.';

const createSut = (
  loading: boolean = false,
  didAnswer: boolean = false,
  surveyData: SurveyModel = mockSurvey(),
): HTMLElement => {
  surveyData.didAnswer = didAnswer;
  surveyData.date = new Date('2020-01-10T00:00:00');
  render(<SurveyItem loading={loading} surveyData={surveyData} />);
  return screen.getByTestId('survey-item');
};

const getSurveyElement = (elName: string): HTMLElement => {
  return screen.getByTestId('survey-item').querySelector(`.survey${elName}`);
};

const testSurveyElement = (surveyData: SurveyModel, didAnswer: boolean): void => {
  createSut(false, didAnswer, surveyData);
  expect(getSurveyElement('Icon')).toHaveClass(
    surveyData.didAnswer ? 'success' : 'warning',
  );
  expect(screen.getByTestId('icon-image')).toHaveAttribute(
    'src',
    surveyData.didAnswer ? IconStatus.thumbsUp : IconStatus.thumbsDown,
  );
  expect(getSurveyElement('Day')).toHaveTextContent('10');
  expect(getSurveyElement('Month')).toHaveTextContent('jan');
  expect(getSurveyElement('Year')).toHaveTextContent('2020');
  expect(getSurveyElement('Question')).toHaveTextContent(surveyData.question);
};

describe('SurveyItem Component', () => {
  it('Should be empty if SurveyItem is loading', () => {
    const sut = createSut(true);
    expect(sut.childElementCount).toBe(0);
  });

  it('Should render SurveyItem with correct surveyData if survey is answered', () => {
    const surveyData = mockSurvey();
    testSurveyElement(surveyData, false);
  });

  it('Should render SurveyItem with correct surveyData if survey is not answered', () => {
    const surveyData = mockSurvey();
    testSurveyElement(surveyData, true);
  });
});
