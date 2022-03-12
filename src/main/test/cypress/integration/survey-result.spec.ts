import faker from 'faker';
import * as HttpMocks from '../utils/http-mocks';
import * as Helpers from '../utils/helpers';

const surveyId = faker.datatype.uuid();

const surveyUrl = new RegExp(`/surveys/${surveyId}/results`);

const visitSurveyResult = (): void => {
  cy.visit(`survey/${surveyId}`);
};

const mockHttpSurveyResultForbbiden = (): void => {
  HttpMocks.mockForbiddenError('GET', surveyUrl);
};

const mockHttpSurveyResultUnexpected = (): void => {
  HttpMocks.mockServerError('GET', surveyUrl);
};

const mockHttpSurveyResultSuccess = (): void => {
  cy.fixture('survey-result').then((surveyResult) => {
    HttpMocks.mockSuccess('GET', surveyUrl, surveyResult);
  });
};

describe('SurveyResult', () => {
  beforeEach(() => {
    Helpers.mockLocalStorageUser();
  });

  it('Should redirect to /login on ForbiddenError', () => {
    mockHttpSurveyResultForbbiden();
    visitSurveyResult();
    Helpers.testWindowUrl('/login');
  });

  it('Should render error on UnexpectedError and reload on click', () => {
    mockHttpSurveyResultUnexpected();
    visitSurveyResult();
    cy.wait('@request');
    cy.getByTestId('reload-button').click();
    Helpers.testApiCalls('request', 2);
  });

  it('Should render correct survey data on success', () => {
    mockHttpSurveyResultSuccess();
    visitSurveyResult();
    cy.wait('@request');
    cy.getByTestId('survey-question').should('have.text', 'Question 1');
    cy.getByTestId('day').should('have.text', '03');
    cy.getByTestId('month').should('have.text', 'fev');
    cy.getByTestId('year').should('have.text', '2018');

    cy.getByTestId('survey-result-answers').children().should('have.length', 2);

    cy.getByTestId('answer-item')
      .eq(0)
      .within((li) => {
        assert.equal(li.find(`[data-testid='answer']`).text(), 'Answer 1');
        assert.equal(li.find(`[data-testid='percent']`).text(), '80%');
        assert.equal(li.attr('data-active'), 'false');
        assert.equal(
          li.find(`[data-testid='image']`).attr('src'),
          'https://picsum.photos/id/237/200/300',
        );
      });

    cy.getByTestId('answer-item')
      .eq(1)
      .within((li) => {
        assert.equal(li.find(`[data-testid='answer']`).text(), 'Answer 2');
        assert.equal(li.find(`[data-testid='percent']`).text(), '60%');
        assert.equal(li.attr('data-active'), 'true');
        assert.equal(li.find(`[data-testid='image']`).attr('src'), undefined);
      });
  });
});
