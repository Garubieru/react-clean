import * as HttpMocks from './http-mocks';
import faker from 'faker';

type SurveyItem = {
  id: string;
  date: Date;
  question: string;
  didAnswer: boolean;
};

export const mockSurveyList = (length: number = 2): SurveyItem[] => {
  const mockSurveyItem = (): SurveyItem => ({
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    question: faker.random.words(),
    didAnswer: faker.datatype.boolean(),
  });
  return Array.from({ length }, mockSurveyItem);
};

export const mockHttpSurveyListSuccess = (surveyList = mockSurveyList()): void => {
  HttpMocks.mockSuccess('GET', /surveys/, surveyList);
};
