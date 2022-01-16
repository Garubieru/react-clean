import faker from 'faker';
import * as Helpers from '../support/form-helper';
import * as HttpLoginMocks from '../support/login-mocks';

const simulateValidSubmit = (doubleClick?: boolean): void => {
  Helpers.populateField('email', faker.internet.email());
  Helpers.populateField('password', faker.internet.password(3));
  Helpers.submitForm('login-button', doubleClick);
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should render page with initial state', () => {
    Helpers.testFieldStatus('email', 'Field is required');
    Helpers.testFieldStatus('password', 'Field is required');
    Helpers.testButtonStatus('login-button', 'disabled');
    Helpers.testErrorContainer('error-msg');
  });

  it('Should show error if input is invalid', () => {
    Helpers.populateField('email');
    Helpers.testFieldStatus('email', 'Invalid email', false);
    Helpers.populateField('password', faker.internet.password(2));
    Helpers.testFieldStatus('password', 'Value must have more than 3 characters', false);
    Helpers.testButtonStatus('login-button', 'disabled');
  });

  it('Should not show error if input is valid ', () => {
    Helpers.populateField('email', faker.internet.email());
    Helpers.testFieldStatus('email', '', false);
    Helpers.populateField('password', faker.internet.password(3));
    Helpers.testFieldStatus('password', '', false);

    Helpers.testButtonStatus('login-button', 'enabled');
    Helpers.testErrorContainer('error-msg');
  });

  it('Should throw InvalidCredentialsError message if invalid credentials are provided', () => {
    HttpLoginMocks.mockInvalidLoginError();
    simulateValidSubmit();
    Helpers.testErrorContainer('error-msg', 'Invalid credentials');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/login');
  });

  it('Should throw UnexpectedError if statusCode is different from 401', () => {
    HttpLoginMocks.mockUnexpectedLoginError();
    simulateValidSubmit();
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/login');
  });

  it('Should show UnexpectedError if body returns invalid data', () => {
    HttpLoginMocks.mockSuccessInvalidData();
    simulateValidSubmit();
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/login');
  });

  it('Should save accessToken in localStorage if credentials are valid', () => {
    HttpLoginMocks.mockSuccessLogin();
    simulateValidSubmit();
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/');
    Helpers.testLocalStorage('accessToken', 'isOk');
  });

  it('Should prevent multiple submits', () => {
    HttpLoginMocks.mockSuccessLogin();
    simulateValidSubmit(true);
    Helpers.testWindowUrl('/');
    Helpers.testApiCalls('request', 1);
  });

  it('Should not be able to submit if form is invalid', () => {
    HttpLoginMocks.mockSuccessLogin();
    Helpers.populateField('email', faker.internet.email()).type('{enter}');
    Helpers.testApiCalls('request', 0);
  });
});
