describe('SurveyList', () => {
  beforeEach(() => cy.visit('/'));

  it('Should render empty surveys on load', () => {
    cy.getByTestId('surveys-list').should('have.length', 4);
  });
});
