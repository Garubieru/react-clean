import 'cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      getByTestId: (id: string) => Cypress.Chainable<JQuery<HTMLElement>>;
      findByTestId: (id: string) => Cypress.Chainable<JQuery<HTMLElement>>;
    }
  }
}
