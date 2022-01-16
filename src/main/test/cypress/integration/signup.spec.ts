import * as Helpers from '../support/form-helper';
import faker from 'faker';

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

  it('Should not show if input is valid', () => {
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
});
