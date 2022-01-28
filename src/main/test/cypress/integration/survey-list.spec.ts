import * as HttpMocks from '../utils/http-mocks';
import * as Helpers from '../utils/helpers';

const url = /surveys/;

export const mockHttpSurveyListSuccess = (): void => {
  cy.fixture('survey-list').then((surveyList) => {
    HttpMocks.mockSuccess('GET', url, surveyList);
  });
};

export const mockHttpSurveyForbidden = (): void => {
  HttpMocks.mockForbiddenError('GET', url);
};

export const mockHttpSurveyUnexpectedError = (): void => {
  HttpMocks.mockServerError('GET', url);
};

export const testSurvey = (
  index: number,
  question: string,
  day: string,
  month: string,
  year: string,
  didAnswer: boolean,
): void => {
  cy.getByTestId('surveys-list')
    .children()
    .eq(index)
    .within((li) => {
      assert.equal(li.find('[data-testid="survey-day"]').text(), day);
      assert.equal(li.find('[data-testid="survey-month"]').text(), month);
      assert.equal(li.find('[data-testid="survey-year"]').text(), year);
      assert.equal(li.find('[data-testid="survey-question"]').text(), question);
      cy.fixture('icons').then((icon) => {
        assert.equal(
          li.find('[data-testid="icon-image"]').attr('src'),
          didAnswer ? icon.thumbsUp : icon.thumbsDown,
        );
      });
    });
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

  it('Should show reload button on UnexpectedError and recall api if is clicked', () => {
    mockHttpSurveyUnexpectedError();
    cy.visit('');
    cy.wait('@request');
    mockHttpSurveyListSuccess();
    cy.getByTestId('reload-button').click();
    cy.getByTestId('surveys-list').children('li:not(:empty)').should('have.length', 2);
    Helpers.testApiCalls('request', 2);
  });

  it('Should render correct surveys on load', () => {
    mockHttpSurveyListSuccess();
    cy.visit('');
    cy.getByTestId('surveys-list').children('li:empty').should('have.length', 4);
    cy.wait('@request');
    cy.getByTestId('surveys-list').children('li:not(:empty)').should('have.length', 2);

    testSurvey(0, 'Question 1', '03', 'fev', '2018', true);
    testSurvey(1, 'Question 2', '13', 'out', '2020', false);

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
