import faker from 'faker';
import * as HttpMocks from '../utils/http-mocks';
import * as SurveyHelpers from '../utils/survey-helpers';
import * as Helpers from '../utils/helpers';

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
  return [mockSurveyItem(), mockSurveyItem()];
};

const url = /surveys/;
export const mockHttpSurveyListSuccess = (surveyList = mockSurveyList()): void => {
  HttpMocks.mockSuccess('GET', url, surveyList);
};

export const mockHttpSurveyForbidden = (): void => {
  HttpMocks.mockForbiddenError('GET', url);
};

export const mockHttpSurveyUnexpectedError = (): void => {
  HttpMocks.mockServerError('GET', url);
};

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.mockLocalStorageUser();
  });

  it('Should logout on ForbiddenError', () => {
    mockHttpSurveyForbidden();
    cy.visit('');
    Helpers.testWindowUrl('/login');
  });

  it('Should show error on UnexpectedError', () => {
    mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('error-wrap').should('have.text', 'An unexpected error ocurred.');
  });

  it('Should show reload button on UnexpectedError and call api if is clicked', () => {
    mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('reload-button').click();
    Helpers.testApiCalls('request', 2);
  });

  it('Should render correct surveys on load', () => {
    const mockedSurvey = mockSurveyList();
    mockedSurvey[0].date = new Date('01-10-2020');
    mockedSurvey[1].date = new Date('10-02-2020');
    mockHttpSurveyListSuccess(mockedSurvey);
    cy.visit('');
    cy.getByTestId('surveys-list').children('li:empty').should('have.length', 4);
    cy.wait('@request');
    cy.getByTestId('surveys-list')
      .children('li:not(:empty)')
      .should('have.length', mockedSurvey.length);

    const [survey1, survey2] = mockedSurvey;
    SurveyHelpers.testSurvey(0, survey1.question, '10', 'jan', '2020', survey1.didAnswer);
    SurveyHelpers.testSurvey(1, survey2.question, '02', 'out', '2020', survey2.didAnswer);

    Helpers.testApiCalls('request', 1);
  });

  it('Should show correct userName in navbar', () => {
    mockHttpSurveyUnexpectedError();
    cy.visit('');
    const { name } = Helpers.getLocalStorageUser();
    cy.getByTestId('user-name').should('have.text', name);
  });

  it('Should logout on logout link click', () => {
    mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('signout-link').click({ force: true });
    Helpers.testWindowUrl('/login');
    Helpers.testLocalStorage('userAccount', 'isNotOk');
  });
});
