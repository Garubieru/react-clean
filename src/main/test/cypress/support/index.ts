Cypress.Commands.add('getByTestId', (testId: string) =>
  cy.get(`[data-testid=${testId}]`),
);

Cypress.Commands.add('findByTestId', { prevSubject: true }, (subject, testId) => {
  cy.wrap(subject).find(`[data-testid=${testId}]`);
});
