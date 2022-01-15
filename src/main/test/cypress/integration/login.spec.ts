import faker from 'faker';

const baseUrl = Cypress.config().baseUrl;

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should render page with initial state', () => {
    cy.getByTestId('email').should('have.attr', 'readonly');
    cy.getByTestId('email-input-wrap')
      .should('have.attr', 'data-status', 'warning')
      .should('have.attr', 'data-showstatus', 'false');
    cy.getByTestId('email-input-status')
      .should('contain.text', 'Field is required')
      .should('not.be.visible');

    cy.getByTestId('password').should('have.attr', 'readonly');
    cy.getByTestId('password-input-wrap')
      .should('have.attr', 'data-status', 'warning')
      .should('have.attr', 'data-showstatus', 'false');
    cy.getByTestId('password-input-status')
      .should('contain.text', 'Field is required')
      .should('not.be.visible');

    cy.getByTestId('login-button').should('be.disabled');

    cy.getByTestId('error-msg').should('not.be.visible');
  });

  it('Should show error if input is invalid', () => {
    cy.getByTestId('email').focus().type(faker.random.word());
    cy.getByTestId('email-input-wrap')
      .should('have.attr', 'data-status', 'warning')
      .should('have.attr', 'data-showstatus', 'true');

    cy.getByTestId('email-input-status')
      .should('contain.text', 'Invalid email')
      .should('be.visible');

    cy.getByTestId('password').focus().type(faker.datatype.string(2));
    cy.getByTestId('password-input-wrap')
      .should('have.attr', 'data-status', 'warning')
      .should('have.attr', 'data-showstatus', 'true');

    cy.getByTestId('password-input-status')
      .should('contain.text', 'Value must have more than 3 characters')
      .should('be.visible');

    cy.getByTestId('login-button').should('be.disabled');
  });

  it('Should not show error if input is valid ', () => {
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('email-input-wrap').should('have.attr', 'data-status', 'success');
    cy.getByTestId('email-input-status')
      .should('not.be.visible')
      .should('contain.text', '');

    cy.getByTestId('password').focus().type(faker.datatype.string(3));
    cy.getByTestId('password-input-wrap').should('have.attr', 'data-status', 'success');
    cy.getByTestId('password-input-status')
      .should('not.be.visible')
      .should('contain.text', '');

    cy.getByTestId('login-button').should('be.enabled');
    cy.getByTestId('error-msg').should('not.be.visible');
  });

  it('Should throw InvalidCredentialsError message if invalid credentials are provided', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 401,
        body: {
          error: faker.random.words(),
        },
      },
    ).as('error');
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password(3));
    cy.getByTestId('login-button').click();
    cy.getByTestId('error-msg')
      .should('exist')
      .should('have.text', 'Invalid credentials');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
  });

  it('Should throw UnexpectedError if statusCode is different from 401', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 400,
        body: {
          error: faker.random.word(),
        },
      },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('login-button').click();
    cy.getByTestId('error-msg')
      .should('exist')
      .should('contain.text', 'An unexpected error ocurred.');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
    cy.window().then((window) =>
      assert.isNotOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('Should show UnexpectedError if body returns invalid data', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          invalidPropery: faker.datatype.uuid(),
        },
      },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password()).type('{enter}');
    cy.getByTestId('error-msg')
      .should('exist')
      .should('contain.text', 'An unexpected error ocurred.');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/login`);
    cy.window().then((window) =>
      assert.notOk(window.localStorage.getItem('accessToken')),
    );
  });

  it('Should save accessToken in localStorage if credentials are valid', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid(),
        },
      },
    );
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('login-button').click();
    cy.getByTestId('error-msg').should('not.exist');
    cy.getByTestId('spinner').should('not.exist');
    cy.url().should('eq', `${baseUrl}/`);
    cy.window().then((window) => assert.isOk(window.localStorage.getItem('accessToken')));
  });

  it('Should prevent multiple submits', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid(),
        },
      },
    ).as('login-request');
    cy.getByTestId('email').focus().type(faker.internet.email());
    cy.getByTestId('password').focus().type(faker.internet.password());
    cy.getByTestId('login-button').dblclick();
    cy.get('@login-request.all').should('have.length', 1);
  });

  it('Should not be able to submit if form is invalid', () => {
    cy.intercept(
      {
        method: 'POST',
        url: /login/,
      },
      {
        statusCode: 200,
        body: {
          accessToken: faker.datatype.uuid(),
        },
      },
    ).as('login-request');
    cy.getByTestId('email').focus().type(faker.random.words());
    cy.getByTestId('password').focus().type(faker.internet.password(2)).type('{enter}');
    cy.get('@login-request.all').should('have.length', 0);
  });
});
