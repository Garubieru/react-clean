import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory, MemoryHistory } from 'history';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { ApiContext } from '@/presentation/context/api/api-context';
import { mockAccount } from '@/domain/test';
import { LoadSurveyResultSpy } from '@/presentation/test';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import SurveyResult from '.';
import { SaveSurveyResultSpy } from '@/presentation/test/mock-save-survey-result';

type SutType = {
  history: MemoryHistory;
  loadSurveyResultSpy: LoadSurveyResultSpy;
  saveSurveyResultSpy: SaveSurveyResultSpy;
  setLoginAccountMock: jest.Mock<any, any>;
};

type SutParams = {
  loadSurveyResultSpy?: LoadSurveyResultSpy;
  saveSurveyResultSpy?: SaveSurveyResultSpy;
};

const createSut = ({
  loadSurveyResultSpy = new LoadSurveyResultSpy(),
  saveSurveyResultSpy = new SaveSurveyResultSpy(),
}: SutParams = {}): SutType => {
  const history = createMemoryHistory({ initialEntries: ['/', '/survey'] });
  const setLoginAccountMock = jest.fn();
  render(
    <ApiContext.Provider
      value={{
        getLoginAccount: () => mockAccount(),
        setLoginAccount: setLoginAccountMock,
      }}
    >
      <Router location={history.location} navigator={history}>
        <SurveyResult
          loadSurveyResult={loadSurveyResultSpy}
          saveSurveyResult={saveSurveyResultSpy}
        />
      </Router>
    </ApiContext.Provider>,
  );
  return {
    history,
    loadSurveyResultSpy,
    saveSurveyResultSpy,
    setLoginAccountMock,
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

  it('Should render correct data on success', async () => {
    const { loadSurveyResultSpy } = createSut();
    loadSurveyResultSpy.surveyResult.date = new Date('10-02-2020');

    loadSurveyResultSpy.surveyResult.answers[0].isCurrentAccountAnswer = true;
    loadSurveyResultSpy.surveyResult.answers[1].isCurrentAccountAnswer = false;

    await waitFor(() => screen.getByTestId('survey-container'));
    expect(screen.getByTestId('day')).toHaveTextContent('02');
    expect(screen.getByTestId('month')).toHaveTextContent('out');
    expect(screen.getByTestId('year')).toHaveTextContent('2020');
    const surveyResult = loadSurveyResultSpy.surveyResult;

    expect(screen.getByTestId('survey-question')).toHaveTextContent(
      surveyResult.question,
    );
    expect(screen.getByTestId('survey-result-answers').childElementCount).toBe(
      surveyResult.answers.length,
    );
    const resultAnswers = surveyResult.answers;

    const answersImages = screen.queryAllByTestId('image');
    expect(answersImages[0]).toHaveAttribute('src', resultAnswers[0].image);
    expect(answersImages[0]).toHaveAttribute('alt', resultAnswers[0].answer);
    expect(answersImages[1]).toBeFalsy();

    const answers = screen.queryAllByTestId('answer');
    expect(answers[0]).toHaveTextContent(resultAnswers[0].answer);
    expect(answers[1]).toHaveTextContent(resultAnswers[1].answer);

    const percents = screen.queryAllByTestId('percent');
    expect(percents[0]).toHaveTextContent(`${resultAnswers[0].percent}%`);
    expect(percents[1]).toHaveTextContent(`${resultAnswers[1].percent}%`);

    const surveyItems = screen.queryAllByTestId('answer-item');
    expect(surveyItems[0]).toHaveAttribute('data-active', 'true');
    expect(surveyItems[1]).toHaveAttribute('data-active', 'false');
  });

  it('Should render error on UnexpectedError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    createSut({ loadSurveyResultSpy });

    await waitFor(() => screen.getByTestId('survey-container'));
    expect(screen.getByTestId('survey-container').childElementCount).toBe(1);
    expect(screen.queryByTestId('loading-container')).not.toBeInTheDocument();
    const errorWrap = screen.getByTestId('error-wrap');

    expect(errorWrap).toBeInTheDocument();
    expect(errorWrap).toHaveTextContent(error.message);
  });

  it('Should logout on ForbiddenError', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new ForbiddenError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    const { history, setLoginAccountMock } = createSut({ loadSurveyResultSpy });

    await waitFor(() => screen.getByTestId('survey-container'));
    expect(screen.queryByTestId('loading-container')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-wrap')).not.toBeInTheDocument();
    expect(history.location.pathname).toBe('/login');
    expect(setLoginAccountMock).toHaveBeenCalledWith(null);
  });

  it('Should call LoadSurveyResult on reload', async () => {
    const loadSurveyResultSpy = new LoadSurveyResultSpy();
    const error = new UnexpectedError();
    jest.spyOn(loadSurveyResultSpy, 'load').mockRejectedValueOnce(error);
    createSut({ loadSurveyResultSpy });
    await waitFor(() => screen.getByTestId('survey-container'));
    fireEvent.click(screen.getByTestId('reload-button'));
    expect(loadSurveyResultSpy.callsCount).toBe(1);
    await waitFor(() => screen.getByTestId('survey-container'));
  });

  it('Should go back to previous page on back button click', async () => {
    const { history } = createSut();
    await waitFor(() => screen.getByTestId('survey-container'));
    fireEvent.click(screen.getByTestId('back-button'));
    expect(history.location.pathname).toBe('/');
  });

  it('Should not present Loading component if SurveyResultItem is active on click', async () => {
    const { loadSurveyResultSpy } = createSut();
    loadSurveyResultSpy.surveyResult.answers[0].isCurrentAccountAnswer = true;
    await waitFor(() => screen.getByTestId('survey-container'));
    const answerItem = screen.getAllByTestId('answer-item')[0];
    fireEvent.click(answerItem);
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
  });

  it('Should call SaveSurveyResult on SurveyResultItem click if item is non active', async () => {
    const { loadSurveyResultSpy, saveSurveyResultSpy } = createSut();
    loadSurveyResultSpy.surveyResult.answers[0].isCurrentAccountAnswer = false;
    await waitFor(() => screen.getByTestId('survey-container'));

    const answerItem = screen.getAllByTestId('answer-item')[0];
    fireEvent.click(answerItem);
    expect(screen.queryByTestId('loading-overlay')).toBeInTheDocument();
    expect(saveSurveyResultSpy.callsCount).toBe(1);
    expect(saveSurveyResultSpy.params).toEqual({
      answer: loadSurveyResultSpy.surveyResult.answers[0].answer,
    });
    await waitFor(() => screen.getByTestId('survey-container'));
    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
  });

  it('Should present ReloadError component on SaveSurveyResult UnexpectedError and reload', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new UnexpectedError());
    const { loadSurveyResultSpy } = createSut({ saveSurveyResultSpy });

    loadSurveyResultSpy.surveyResult.answers[0].isCurrentAccountAnswer = false;
    await waitFor(() => screen.getByTestId('survey-container'));

    const answerItem = screen.getAllByTestId('answer-item')[0];
    fireEvent.click(answerItem);

    expect(screen.queryByTestId('loading-overlay')).toBeInTheDocument();
    await waitFor(() => screen.getByTestId('survey-container'));

    expect(screen.queryByTestId('loading-overlay')).not.toBeInTheDocument();
    expect(screen.queryByTestId('error-wrap')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('reload-button'));

    await waitFor(() => screen.getByTestId('survey-container'));

    expect(loadSurveyResultSpy.callsCount).toBe(2);
  });

  it('Should logout if SaveSurveyResult.save throws ForbiddenError', async () => {
    const saveSurveyResultSpy = new SaveSurveyResultSpy();
    jest.spyOn(saveSurveyResultSpy, 'save').mockRejectedValueOnce(new ForbiddenError());
    const { loadSurveyResultSpy, history, setLoginAccountMock } = createSut({
      saveSurveyResultSpy,
    });
    loadSurveyResultSpy.surveyResult.answers[0].isCurrentAccountAnswer = false;
    await waitFor(() => screen.queryByTestId('survey-container'));

    fireEvent.click(screen.queryAllByTestId('answer-item')[0]);
    await waitFor(() => screen.queryByTestId('survey-container'));
    expect(history.location.pathname).toBe('/login');
    expect(setLoginAccountMock).toHaveBeenCalledWith(null);
  });
});
