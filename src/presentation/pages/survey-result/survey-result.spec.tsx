import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { render, screen, waitFor } from '@testing-library/react';
import { ApiContext } from '@/presentation/context/api/api-context';
import { mockAccount } from '@/domain/test';
import { LoadSurveyResultSpy } from '@/presentation/test';
import SurveyResult from '.';

type SutType = {
  history: MemoryHistory;
  loadSurveyResultSpy: LoadSurveyResultSpy;
};

const createSut = (loadSurveyResultSpy = new LoadSurveyResultSpy()): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider
      value={{ getLoginAccount: () => mockAccount(), setLoginAccount: jest.fn() }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyResult loadSurveyResult={loadSurveyResultSpy} />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    history,
    loadSurveyResultSpy,
  };
};

describe('SurveyResult', () => {
  it('Should render page with initial state', async () => {
    createSut();
    const surveyContainer = screen.getByTestId('survey-container');
    expect(surveyContainer.childElementCount).toBe(0);
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading-overlat')).not.toBeInTheDocument();
    await waitFor(() => screen.getByTestId('survey-container'));
  });

  it('Should call LoadSurveyResult', async () => {
    const { loadSurveyResultSpy } = createSut();
    await waitFor(() => screen.getByTestId('survey-container'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
  });
});
