import faker from 'faker';
import * as HttpMocks from '../utils/http-mocks';
import * as Helpers from '../utils/helpers';

const surveyId = faker.datatype.uuid();

const surveyUrl = new RegExp(`/surveys/${surveyId}/results`);

const visitSurveyResult = (): void => {
  cy.visit(`survey/${surveyId}`);
};

const mockHttpSurveyResultForbidden = (): void => {
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

const mockHttpSaveSurveyResultSuccess = (): void => {
  cy.fixture('save-survey-result').then((surveyResult) => {
    HttpMocks.mockSuccess('PUT', surveyUrl, surveyResult, 'saveSurvey');
  });
};

const mockHttpSaveSurveyResultForbidden = (): void => {
  HttpMocks.mockForbiddenError('PUT', surveyUrl, 'saveSurvey');
};

const mockHttpSaveSurveyResultUnexpected = (): void => {
  HttpMocks.mockServerError('PUT', surveyUrl, 'saveSurvey');
};

describe('SurveyResult', () => {
  beforeEach(() => {
    Helpers.mockLocalStorageUser();
    mockHttpSurveyResultSuccess();
    visitSurveyResult();
  });

  describe('Load', () => {
    it('Should redirect to /login on ForbiddenError', () => {
      mockHttpSurveyResultForbidden();
      Helpers.testWindowUrl('/login');
    });

    it('Should render error on UnexpectedError and reload on click', () => {
      mockHttpSurveyResultUnexpected();
      cy.wait('@request');
      cy.getByTestId('reload-button').click();
      Helpers.testApiCalls('request', 2);
    });

    it('Should render correct survey data on success', () => {
      mockHttpSurveyResultSuccess();
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

  describe('Save', () => {
    it('Should not call api when AnswerItem is not active', () => {
      mockHttpSaveSurveyResultSuccess();
      cy.getByTestId('answer-item').eq(1).click();
      Helpers.testApiCalls('saveSurvey', 0);
    });

    it('Should redirect to /login on ForbiddenError', () => {
      cy.wait('@request');
      mockHttpSaveSurveyResultForbidden();
      cy.getByTestId('answer-item').eq(0).click();
      Helpers.testWindowUrl('/login');
    });

    it('Should show error message on UnexpectedError', () => {
      cy.wait('@request');
      mockHttpSaveSurveyResultUnexpected();
      cy.getByTestId('answer-item').eq(0).click();
      cy.wait('@saveSurvey');
      cy.getByTestId('error-wrap').should('have.text', 'An unexpected error ocurred.');
      cy.getByTestId('reload-button').click();
      Helpers.testApiCalls('request', 2);
    });

    it('Should call api when AnswerItem is active an re-render list', () => {
      cy.wait('@request');
      mockHttpSaveSurveyResultSuccess();
      cy.getByTestId('answer-item').eq(0).click();
      cy.wait('@saveSurvey');
      Helpers.testApiCalls('saveSurvey', 1);

      cy.getByTestId('survey-question').should('have.text', 'Other question');
      cy.getByTestId('day').should('have.text', '03');
      cy.getByTestId('month').should('have.text', 'out');
      cy.getByTestId('year').should('have.text', '2019');

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
          assert.equal(li.find(`[data-testid='answer']`).text(), 'Answer 3');
          assert.equal(li.find(`[data-testid='percent']`).text(), '60%');
          assert.equal(li.attr('data-active'), 'true');
          assert.equal(li.find(`[data-testid='image']`).attr('src'), undefined);
        });
    });
  });
});
