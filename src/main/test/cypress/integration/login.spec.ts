import faker from 'faker';

const baseUrl = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should render page with initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly');
    cy.getByTestId('email-status')
      .get('svg')
      .should('have.class', 'fa-exclamation-circle');
    cy.getByTestId('email-status').should('contain.text', 'Field is required');

    cy.getByTestId('password').should('have.attr', 'readonly');
    cy.getByTestId('password-status')
      .get('svg')
      .should('have.class', 'fa-exclamation-circle');
    cy.getByTestId('password-status').should('contain.text', 'Field is required');

    cy.getByTestId('login-button').should('be.disabled');

    cy.getByTestId('error-msg').should('not.be.visible');
  });

  it('Should show error if input is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-status').should('contain.text', 'Invalid email');

    cy.getByTestId('password').focus().type(faker.datatype.string(2));
    cy.getByTestId('password-status').should(
      'contain.text',
      'Value must have more than 3 characters',
    );

    cy.getByTestId('login-button').should('be.disabled');
  });

  it('Should not show error if input is valid ', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-status').get('svg').should('have.class', 'fa-check-circle');
    cy.getByTestId('email-status').should('contain.text', '');

    cy.getByTestId('password').focus().type(faker.datatype.string(3));
    cy.getByTestId('password-status').get('svg').should('have.class', 'fa-check-circle');
    cy.getByTestId('password-status').should('contain.text', '');

    cy.getByTestId('login-button').should('be.enabled');
    cy.getByTestId('error-msg').should('not.be.visible');
  });

  it('Should show error message if invalid credentials are provided', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.datatype.string(3));
    cy.getByTestId('login-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('error-msg')
      .should('exist')
      .should('have.text', 'Invalid credentials');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should save accessToken in localStorage if credentials are valid', () => {
    cy.getByTestId('email').focus().type('gabrielmorishita@gmail.com');
    cy.getByTestId('password').focus().type('Bl@ck0ps23');
    cy.getByTestId('login-button').click().getByTestId('spinner').should('exist');
    cy.getByTestId('error-msg').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')));
  });
});
