import faker from 'faker';

export const baseUrl = Cypress.config().baseUrl;

export const testFieldStatus = (
  fieldName: string,
  error?: string,
  initial = true,
): void => {
  cy.getByTestId(fieldName).should(
    `${initial ? 'have.attr' : 'not.have.attr'}`,
    'readonly',
  );
  cy.getByTestId(`${fieldName}-input-wrap`)
    .should('have.attr', 'data-status', error ? 'warning' : 'success')
    .should('have.attr', 'data-showstatus', initial ? 'false' : 'true');

  cy.getByTestId(`${fieldName}-input-status`)
    .should('contain.text', error || '')
    .should(initial || !error ? 'not.be.visible' : 'be.visible');
};

export const populateField = (
  fieldName: string,
  value: string = faker.random.words(),
): Cypress.Chainable<JQuery<HTMLElement>> => {
  return cy.getByTestId(fieldName).focus().type(value);
};

export const testButtonStatus = (
  buttonName: string,
  status: 'enabled' | 'disabled',
): void => {
  cy.getByTestId(buttonName).should(`be.${status}`);
};

export const testErrorContainer = (containerName: string, error?: string): void => {
  cy.getByTestId(containerName)
    .should(error ? 'be.visible' : 'not.be.visible')
    .should('have.text', error || '');
};

export const testElementExists = (
  elName: string,
  status: 'exist' | 'not.exist',
): void => {
  cy.getByTestId(elName).should(status);
};

export const submitForm = (button: string, doubleClick: boolean = false): void => {
  cy.getByTestId(button)[doubleClick ? 'dblclick' : 'click']();
};
