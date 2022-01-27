import faker from 'faker';
import * as SurveyMocks from '../support/survey-mocks';
import * as SurveyHelpers from '../support/survey-helpers';
import * as Helpers from '../support/helpers';

describe('SurveyList', () => {
  beforeEach(() => {
    cy.window().then((window) =>
      window.localStorage.setItem(
        'userAccount',
        JSON.stringify({
          name: faker.name.findName(),
          accessToken: faker.datatype.uuid(),
        }),
      ),
    );
    cy.visit('/');
  });

  it('Should render empty surveys on load', () => {
    const mockedSurvey = SurveyMocks.mockSurveyList();
    mockedSurvey[0].date = new Date('01-10-2020');
    mockedSurvey[1].date = new Date('10-02-2020');
    SurveyMocks.mockHttpSurveyListSuccess(mockedSurvey);

    cy.getByTestId('surveys-list').children('li:empty').should('have.length', 4);
    cy.getByTestId('surveys-list')
      .children('li:not(:empty)')
      .should('have.length', mockedSurvey.length);

    const [survey1, survey2] = mockedSurvey;
    SurveyHelpers.testSurvey(0, survey1.question, '10', 'jan', '2020', survey1.didAnswer);
    SurveyHelpers.testSurvey(1, survey2.question, '02', 'out', '2020', survey2.didAnswer);
    Helpers.testApiCalls('request', 1);
  });
});
