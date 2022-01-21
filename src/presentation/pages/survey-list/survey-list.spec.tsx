import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';

import { LoadSurveyList } from '@/domain/usecases';
import SurveyList from '.';
import { SurveyModel } from '@/domain/models';
import { mockSurveyList } from '@/domain/test';

class LoadSurveyListStub implements LoadSurveyList {
  public callsCount = 0;
  public surveyList = mockSurveyList(this.surveyItemsLength);

  constructor(public surveyItemsLength: number) {}

  async list(): Promise<SurveyModel[]> {
    this.callsCount++;
    return await Promise.resolve(this.surveyList);
  }
}

type SutTypes = {
  loadSurveyListStub: LoadSurveyListStub;
};

const createSut = (surveyItemsLength: number = 5): SutTypes => {
  const loadSurveyListStub = new LoadSurveyListStub(surveyItemsLength);
  render(<SurveyList loadSurveyList={loadSurveyListStub} />);
  return {
    loadSurveyListStub,
  };
};

describe('SurveyList Component', () => {
  it('Should render with 4 empty items on start', async () => {
    createSut();
    const surveyList = screen.getByTestId('surveys-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
  });

  it('Should call LoadSurveyList only once when component is rendered', async () => {
    const { loadSurveyListStub } = createSut();
    expect(loadSurveyListStub.callsCount).toBe(1);
    await waitFor(() => screen.getByRole('heading'));
  });

  it('Should render all SurveyItems properly', async () => {
    const surveyListLength = 10;
    createSut(surveyListLength);
    const surveyList = screen.getByTestId('surveys-list');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
    await waitFor(() => surveyList);
    expect(surveyList.querySelectorAll('li:not(:empty)')).toHaveLength(10);
  });
});
