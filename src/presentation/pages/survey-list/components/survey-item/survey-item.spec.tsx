import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { mockSurvey } from '@/domain/test';
import { LoadSurveyList } from '@/domain/usecases';
import { IconStatus } from '../survey-icon-status';
import SurveyItem from '.';

type SutType = {
  history: MemoryHistory;
};

const createSut = (
  loading: boolean = false,
  surveyData: LoadSurveyList.Model = mockSurvey(),
): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <Router location={history.location} navigator={history}>
      <SurveyItem loading={loading} surveyData={surveyData} />
    </Router>,
  );
  return {
    history,
  };
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

  it('Should redirect to correct url on See Result click', () => {
    const surveyData = mockSurvey();
    const { history } = createSut(false, surveyData);
    fireEvent.click(screen.getByTestId('footer-link'));
    expect(history.location.pathname).toBe(`/survey/${surveyData.id}`);
  });
});
