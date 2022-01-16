import * as Helpers from '../support/form-helper';
import * as HttpSignupMocks from '../support/signup-mocks';
import faker from 'faker';

const simulateValidSubmit = (doubleClick?: boolean): void => {
  Helpers.populateField('name', faker.random.alphaNumeric(3));
  Helpers.populateField('email', faker.internet.email());
  const password = faker.internet.password();
  Helpers.populateField('password', password);
  Helpers.populateField('passwordConfirmation', password);
  Helpers.submitForm('create-btn', doubleClick);
};

describe('Signup', () => {
  beforeEach(() => cy.visit('/signup'));
  it('Should render page with initial state', () => {
    Helpers.testFieldStatus('name', 'Field is required');
    Helpers.testFieldStatus('email', 'Field is required');
    Helpers.testFieldStatus('password', 'Field is required');
    Helpers.testFieldStatus('passwordConfirmation', 'Field is required');
    Helpers.testErrorContainer('error-msg');
    Helpers.testButtonStatus('create-btn', 'disabled');
  });

  it('Should show error if input is invalid', () => {
    Helpers.populateField('name', faker.random.alpha({ count: 2 }));
    Helpers.testFieldStatus('name', 'Value must have more than 3 characters', false);

    Helpers.populateField('email', faker.random.word());
    Helpers.testFieldStatus('email', 'Invalid email', false);

    Helpers.populateField('password', faker.random.alphaNumeric(2));
    Helpers.testFieldStatus('password', 'Value must have more than 3 characters', false);

    Helpers.populateField('passwordConfirmation', faker.random.word());
    Helpers.testFieldStatus(
      'passwordConfirmation',
      'Field must be equal to password',
      false,
    );

    Helpers.testButtonStatus('create-btn', 'disabled');
  });

  it('Should not show error if input is valid', () => {
    Helpers.populateField('name', faker.random.alphaNumeric(3));
    Helpers.testFieldStatus('name', '', false);

    Helpers.populateField('email', faker.internet.email());
    Helpers.testFieldStatus('email', '', false);

    const password = faker.internet.password();

    Helpers.populateField('password', password);
    Helpers.testFieldStatus('password', '', false);

    Helpers.populateField('passwordConfirmation', password);
    Helpers.testFieldStatus('passwordConfirmation', '', false);

    Helpers.testButtonStatus('create-btn', 'enabled');
  });

  it('Should throw EmailInUseError if response statusCode returns 403', () => {
    HttpSignupMocks.mockEmailInUseSignupError();
    simulateValidSubmit();
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'E-mail already in use');
  });

  it('Should throw UnexpectedError if response statusCode is different than 403', () => {
    HttpSignupMocks.mockUnexpectedSignupError();
    simulateValidSubmit();
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
  });

  it('Should throw UnexpectedError if response returns an invalid body', () => {
    HttpSignupMocks.mockInvalidSignupSuccess();
    simulateValidSubmit();
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
  });

  it('Should not be able to submit if form is invalid', () => {
    HttpSignupMocks.mockSignupSuccess();
    Helpers.populateField('email', faker.internet.email()).type('{enter}');
    Helpers.testApiCalls('request', 0);
  });

  it('Should store accessToken in localStorage if valid credentials are provided', () => {
    HttpSignupMocks.mockSignupSuccess();
    simulateValidSubmit();
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testLocalStorage('accessToken', 'isOk');
    Helpers.testWindowUrl('/');
  });

  it('Should prevent multiple submit', () => {
    HttpSignupMocks.mockSignupSuccess();
    simulateValidSubmit(true);
    Helpers.testApiCalls('request', 1);
  });
});
