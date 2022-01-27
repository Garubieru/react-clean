import * as HttpMocks from './http-mocks';

export const mockEmptySurveyList = (): void => {
  HttpMocks.mockSuccess('GET', /surveys/, []);
};
