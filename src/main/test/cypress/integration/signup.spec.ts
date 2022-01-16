import * as Helpers from '../support/form-helper';
import * as HttpSignupMocks from '../support/signup-mocks';
import faker from 'faker';

const simulateValidSubmit = (): void => {
  Helpers.populateField('name', faker.random.alphaNumeric(3));
  Helpers.populateField('email', faker.internet.email());
  const password = faker.internet.password();
  Helpers.populateField('password', password);
  Helpers.populateField('passwordConfirmation', password);
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
    Helpers.submitForm('create-btn');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'E-mail already in use');
  });

  it('Should throw UnexpectedError if response statusCode is different than 403', () => {
    HttpSignupMocks.mockUnexpectedSignupError();
    simulateValidSubmit();
    Helpers.submitForm('create-btn');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
  });

  it('Should throw UnexpectedError if response returns an invalid body', () => {
    HttpSignupMocks.mockInvalidSignupSuccess();
    simulateValidSubmit();
    Helpers.submitForm('create-btn');
    Helpers.testElementExists('spinner', 'not.exist');
    Helpers.testErrorContainer('error-msg', 'An unexpected error ocurred.');
  });
});
