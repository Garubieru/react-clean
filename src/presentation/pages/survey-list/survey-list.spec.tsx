import React from 'react';
import { render, screen } from '@testing-library/react';

import { LoadSurveyList } from '@/domain/usecases';
import SurveyList from '.';
import { SurveyModel } from '@/domain/models';
import { mockSurveyList } from '@/domain/test';

class LoadSurveyListStub implements LoadSurveyList {
  public callsCount = 0;
  async list(): Promise<SurveyModel[]> {
    this.callsCount++;
    return await Promise.resolve(mockSurveyList());
  }
}

type SutTypes = {
  loadSurveyListStub: LoadSurveyListStub;
};

const createSut = (): SutTypes => {
  const loadSurveyListStub = new LoadSurveyListStub();
  render(<SurveyList loadSurveyList={loadSurveyListStub} />);
  return {
    loadSurveyListStub,
  };
};

describe('SurveyList Component', () => {
  it('Should render with 4 empty items on start', () => {
    createSut();
    const surveyList = screen.getByTestId('surveysList');
    expect(surveyList.querySelectorAll('li:empty')).toHaveLength(4);
  });

  it('Should call LoadSurveyList only once when component is rendered', () => {
    const { loadSurveyListStub } = createSut();
    expect(loadSurveyListStub.callsCount).toBe(1);
  });
});
