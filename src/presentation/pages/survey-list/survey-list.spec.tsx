import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryHistory } from 'history';

import { UnexpectedError } from '@/domain/errors';
import { LoadSurveyListStub } from '@/presentation/test';
import { ApiContext } from '@/presentation/context/api/api-context';

import { SurveyList } from '@/presentation/pages';
import { Router } from 'react-router-dom';
import { mockAccount } from '@/domain/test';

type SutTypes = {
  loadSurveyListStub: LoadSurveyListStub;
};

const createSut = (
  loadSurveyListStub: LoadSurveyListStub = new LoadSurveyListStub(),
): SutTypes => {
  const history = createMemoryHistory();
  render(
    <ApiContext.Provider
      value={{
        getLoginAccount: jest.fn(() => mockAccount()),
        setLoginAccount: jest.fn(),
      }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyList loadSurveyList={loadSurveyListStub} />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    loadSurveyListStub,
  };
};

describe('SurveyList Component', () => {
  it('Should render with 4 empty items on start', async () => {
    createSut();
    const surveyList = screen.getByTestId('surveys-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument();
    await waitFor(() => surveyList);
  });

  it('Should call LoadSurveyList only once when component is rendered', async () => {
    const { loadSurveyListStub } = createSut();
    expect(loadSurveyListStub.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  it('Should render all SurveyItems properly on success', async () => {
    const surveyListLength = 10;
    const loadSurveyListStub = new LoadSurveyListStub(surveyListLength);
    createSut(loadSurveyListStub);
    const surveyList = screen.getByTestId('surveys-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll('li:not(:empty)')).toHaveLength(surveyListLength);
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument();
  });

  it('Should render error if LoadSurveyList fails', async () => {
    const loadSurveyListStub = new LoadSurveyListStub();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyListStub, 'list').mockRejectedValueOnce(error);
    createSut(loadSurveyListStub);
    await waitFor(() => screen.getByRole('heading'));
    expect(screen.queryByTestId('surveys-list')).not.toBeInTheDocument();
    expect(screen.getByTestId('error-wrap')).toHaveTextContent(error.message);
  });

  it('Should recall LoadSurveyList on reload click button if LoadSurveyList fails', async () => {
    const loadSurveyListStub = new LoadSurveyListStub();
    jest.spyOn(loadSurveyListStub, 'list').mockRejectedValueOnce(new UnexpectedError());
    createSut(loadSurveyListStub);
    await waitFor(() => screen.getByRole('heading'));
    fireEvent.click(screen.getByTestId('reload-button'));
    expect(loadSurveyListStub.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });
});
