import * as HttpMocks from './http-mocks';
import faker from 'faker';

type SurveyItem = {
  id: string;
  date: Date;
  question: string;
  didAnswer: boolean;
};

const method = 'GET';
const url = /surveys/;

export const mockSurveyList = (length: number = 2): SurveyItem[] => {
  const mockSurveyItem = (): SurveyItem => ({
    id: faker.datatype.uuid(),
    date: faker.date.recent(),
    question: faker.random.words(),
    didAnswer: faker.datatype.boolean(),
  });
  return [mockSurveyItem(), mockSurveyItem()];
};

export const mockHttpSurveyListSuccess = (surveyList = mockSurveyList()): void => {
  HttpMocks.mockSuccess(method, url, surveyList);
};

export const mockHttpSurveyForbidden = (): void => {
  HttpMocks.mockForbiddenError(method, url);
};

export const mockHttpSurveyUnexpectedError = (): void => {
  HttpMocks.mockServerError(method, url);
};
