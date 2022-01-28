import faker from 'faker';
import * as FormHelpers from '../utils/form-helpers';
import * as Helpers from '../utils/helpers';
import * as HttpMocks from '../utils/http-mocks';

const simulateValidSubmit = (doubleClick?: boolean): void => {
  FormHelpers.populateField('name', faker.random.alphaNumeric(3));
  FormHelpers.populateField('email', faker.internet.email());
  const password = faker.internet.password();
  FormHelpers.populateField('password', password);
  FormHelpers.populateField('passwordConfirmation', password);
  FormHelpers.submitForm('create-btn', doubleClick);
};

const url = /signup/;
export const mockEmailInUseSignupError = (): void => {
  HttpMocks.mockForbiddenError('POST', url);
};

export const mockUnexpectedSignupError = (): void => {
  HttpMocks.mockServerError('POST', url);
};

export const mockInvalidSignupSuccess = (): void => {
  HttpMocks.mockSuccess('POST', url, { invalid: faker.datatype.uuid() });
};

export const mockSignupSuccess = (): void => {
  HttpMocks.mockSuccess('POST', url, 'fx:account');
};

describe('Signup', () => {
  beforeEach(() => cy.visit('/signup'));
  it('Should render page with initial state', () => {
    FormHelpers.testFieldStatus('name', 'Field is required');
    FormHelpers.testFieldStatus('email', 'Field is required');
    FormHelpers.testFieldStatus('password', 'Field is required');
    FormHelpers.testFieldStatus('passwordConfirmation', 'Field is required');
    FormHelpers.testErrorContainer('error-msg');
    FormHelpers.testButtonStatus('create-btn', 'disabled');
  });

  it('Should show error if input is invalid', () => {
    FormHelpers.populateField('name', faker.random.alpha({ count: 2 }));
    FormHelpers.testFieldStatus('name', 'Value must have more than 3 characters', false);

    FormHelpers.populateField('email', faker.random.word());
    FormHelpers.testFieldStatus('email', 'Invalid email', false);

    FormHelpers.populateField('password', faker.random.alphaNumeric(2));
    FormHelpers.testFieldStatus(
      'password',
      'Value must have more than 3 characters',
      false,
    );

    FormHelpers.populateField('passwordConfirmation', faker.random.word());
    FormHelpers.testFieldStatus(
      'passwordConfirmation',
      'Field must be equal to password',
      false,
    );

    FormHelpers.testButtonStatus('create-btn', 'disabled');
  });

  it('Should not show error if input is valid', () => {
    FormHelpers.populateField('name', faker.random.alphaNumeric(3));
    FormHelpers.testFieldStatus('name', '', false);

    FormHelpers.populateField('email', faker.internet.email());
    FormHelpers.testFieldStatus('email', '', false);

    const password = faker.internet.password();

    FormHelpers.populateField('password', password);
    FormHelpers.testFieldStatus('password', '', false);

    FormHelpers.populateField('passwordConfirmation', password);
    FormHelpers.testFieldStatus('passwordConfirmation', '', false);

    FormHelpers.testButtonStatus('create-btn', 'enabled');
  });

  it('Should throw EmailInUseError if response statusCode returns 403', () => {
    mockEmailInUseSignupError();
    simulateValidSubmit();
    FormHelpers.testElementExists('spinner', 'not.exist');
    FormHelpers.testErrorContainer('error-msg', 'E-mail already in use');
    Helpers.testWindowUrl('/signup');
  });

  it('Should throw UnexpectedError if response statusCode is different than 403', () => {
    mockUnexpectedSignupError();
    simulateValidSubmit();
    FormHelpers.testElementExists('spinner', 'not.exist');
    FormHelpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
    Helpers.testWindowUrl('/signup');
  });

  it('Should not be able to submit if form is invalid', () => {
    mockSignupSuccess();
    FormHelpers.populateField('email', faker.internet.email()).type('{enter}');
    cy.wait('@request');
    Helpers.testApiCalls('request', 0);
    Helpers.testWindowUrl('/signup');
  });

  it('Should store userAccount in localStorage if valid credentials are provided', () => {
    mockSignupSuccess();
    simulateValidSubmit();
    FormHelpers.testElementExists('spinner', 'not.exist');
    Helpers.testLocalStorage('userAccount', 'isOk');
    Helpers.testWindowUrl('/');
  });

  it('Should prevent multiple submit', () => {
    mockSignupSuccess();
    simulateValidSubmit(true);
    cy.wait('@request');
    Helpers.testApiCalls('request', 1);
  });
});
