import * as SurveyMocks from '../support/survey-mocks';
import * as SurveyHelpers from '../support/survey-helpers';
import * as Helpers from '../support/helpers';

describe('SurveyList', () => {
  beforeEach(() => {
    Helpers.mockLocalStorageUser();
  });

  it('Should logout on ForbiddenError', () => {
    SurveyMocks.mockHttpSurveyForbidden();
    cy.visit('');
    Helpers.testWindowUrl('/login');
  });

  it('Should show error on UnexpectedError', () => {
    SurveyMocks.mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('error-wrap').should('have.text', 'An unexpected error ocurred.');
    cy.getByTestId('reload-button').click();
    Helpers.testApiCalls('request', 2);
  });

  it('Should show reload button on UnexpectedError and call api if is clicked', () => {
    SurveyMocks.mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('reload-button').click();
    Helpers.testApiCalls('request', 2);
  });

  it('Should render correct surveys on load', () => {
    const mockedSurvey = SurveyMocks.mockSurveyList();
    mockedSurvey[0].date = new Date('01-10-2020');
    mockedSurvey[1].date = new Date('10-02-2020');
    SurveyMocks.mockHttpSurveyListSuccess(mockedSurvey);
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
    SurveyMocks.mockHttpSurveyUnexpectedError();
    cy.visit('');
    const { name } = Helpers.getLocalStorageUser();
    cy.getByTestId('user-name').should('have.text', name);
  });

  it('Should logout on logout link click', () => {
    SurveyMocks.mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.getByTestId('signout-link').click({ force: true });
    Helpers.testWindowUrl('/login');
    Helpers.testLocalStorage('userAccount', 'isNotOk');
  });
});
