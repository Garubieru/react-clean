import faker from 'faker';
import * as FormHelpers from '../support/form-helpers';
import * as HttpLoginMocks from '../support/login-mocks';
import * as Helpers from '../support/helpers';

const simulateValidSubmit = (doubleClick?: boolean): void => {
  FormHelpers.populateField('email', faker.internet.email());
  FormHelpers.populateField('password', faker.internet.password(3));
  FormHelpers.submitForm('login-button', doubleClick);
};

describe('Login', () => {
  beforeEach(() => {
    cy.visit('login');
  });

  it('Should render page with initial state', () => {
    FormHelpers.testFieldStatus('email', 'Field is required');
    FormHelpers.testFieldStatus('password', 'Field is required');
    FormHelpers.testButtonStatus('login-button', 'disabled');
    FormHelpers.testErrorContainer('error-msg');
  });

  it('Should show error if input is invalid', () => {
    FormHelpers.populateField('email');
    FormHelpers.testFieldStatus('email', 'Invalid email', false);
    FormHelpers.populateField('password', faker.internet.password(2));
    FormHelpers.testFieldStatus(
      'password',
      'Value must have more than 3 characters',
      false,
    );
    FormHelpers.testButtonStatus('login-button', 'disabled');
  });

  it('Should not show error if input is valid ', () => {
    FormHelpers.populateField('email', faker.internet.email());
    FormHelpers.testFieldStatus('email', '', false);
    FormHelpers.populateField('password', faker.internet.password(3));
    FormHelpers.testFieldStatus('password', '', false);

    FormHelpers.testButtonStatus('login-button', 'enabled');
    FormHelpers.testErrorContainer('error-msg');
  });

  it('Should throw InvalidCredentialsError message if invalid credentials are provided', () => {
    HttpLoginMocks.mockInvalidLoginError();
    simulateValidSubmit();
    FormHelpers.testErrorContainer('error-msg', 'Invalid credentials');
    FormHelpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/login');
  });

  it('Should throw UnexpectedError if statusCode is different from 401', () => {
    HttpLoginMocks.mockUnexpectedLoginError();
    simulateValidSubmit();
    FormHelpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
    FormHelpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/login');
  });

  it('Should save userAccount in localStorage if credentials are valid', () => {
    HttpLoginMocks.mockSuccessLogin();
    simulateValidSubmit();
    FormHelpers.testElementExists('spinner', 'not.exist');
    Helpers.testWindowUrl('/');
    Helpers.testLocalStorage('userAccount', 'isOk');
  });

  it('Should prevent multiple submits', () => {
    HttpLoginMocks.mockSuccessLogin();
    simulateValidSubmit(true);
    Helpers.testWindowUrl('/');
    Helpers.testApiCalls('request', 1);
  });

  it('Should not be able to submit if form is invalid', () => {
    HttpLoginMocks.mockSuccessLogin();
    FormHelpers.populateField('email', faker.internet.email()).type('{enter}');
    Helpers.testApiCalls('request', 0);
  });
});
