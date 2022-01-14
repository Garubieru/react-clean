describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should render page with initial state', () => {
    cy.getByTestId('email-status')
      .get('svg')
      .should('have.class', 'fa-exclamation-circle');
    cy.getByTestId('email-status').should('contain.text', 'Field is required');
  });
});
