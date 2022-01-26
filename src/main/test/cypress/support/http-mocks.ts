import faker from 'faker';

export const mockUnauthorizedError = (method: string, url: RegExp): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: 401,
      body: {
        error: faker.random.words(),
      },
    },
  ).as('request');
};

export const mockServerError = (method: string, url: RegExp): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: faker.helpers.randomize([400, 500, 404]),
      body: {
        error: faker.random.words(),
      },
    },
  ).as('request');
};

export const mockForbiddenError = (method: string, url: RegExp): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: 403,
      body: {
        error: faker.random.words(),
      },
    },
  ).as('request');
};

export const mockSuccess = (method: string, url: RegExp, body: any): void => {
  cy.intercept(
    {
      method: method,
      url,
    },
    {
      statusCode: 200,
      body,
    },
  ).as('request');
};
