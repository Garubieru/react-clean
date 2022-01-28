import faker from 'faker';
export const baseUrl = Cypress.config().baseUrl;

export const testWindowUrl = (path: string): void => {
  cy.url().should('eq', `${baseUrl}${path}`);
};

export const testApiCalls = (apiMockName: string, calls: number): void => {
  cy.get(`@${apiMockName}.all`).should('have.length', calls);
};

export const testLocalStorage = (key: string, status: 'isOk' | 'isNotOk'): void => {
  cy.window().then((window) => assert[status](window.localStorage.getItem(key)));
};

export const mockLocalStorageUser = (): void => {
  cy.window().then((window) =>
    window.localStorage.setItem(
      'userAccount',
      JSON.stringify({ name: faker.name.findName(), accessToken: faker.datatype.uuid() }),
    ),
  );
};

export const getLocalStorageUser = (): any => {
  return JSON.parse(localStorage.getItem('userAccount'));
};
