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

    Helpers.populateField('password', faker.random.word());
    Helpers.testFieldStatus('password', 'Fields must be equal', false);

    Helpers.populateField('passwordConfirmation', faker.random.word());
    Helpers.testFieldStatus('passwordConfirmation', 'Fields must be equal', false);

    Helpers.testButtonStatus('create-btn', 'disabled');
  });
});
