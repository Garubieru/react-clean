import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';

import { render, screen } from '@testing-library/react';
import SurveyResult from '.';
import { ApiContext } from '@/presentation/context/api/api-context';
import { mockAccount } from '@/domain/test';

type SutType = {
  history: MemoryHistory;
};

const createSut = (): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/'] });
  render(
    <ApiContext.Provider
      value={{ getLoginAccount: () => mockAccount(), setLoginAccount: jest.fn() }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyResult />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    history,
  };
};

describe('SurveyResult', () => {
  it('Should render page with initial state', () => {
    createSut();
    const surveyContainer = screen.getByTestId('survey-container');
    expect(surveyContainer.childElementCount).toBe(0);
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument();
    expect(screen.queryByTestId('loading-overlat')).not.toBeInTheDocument();
  });
});
