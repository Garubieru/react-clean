import faker from 'faker';

export const mockUnauthorizedError = (
  method: string,
  url: RegExp | string,
  name = 'request',
): void => {
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
  ).as(name);
};

export const mockServerError = (
  method: string,
  url: RegExp | string,
  name = 'request',
): void => {
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
  ).as(name);
};

export const mockForbiddenError = (
  method: string,
  url: RegExp | string,
  name = 'request',
): void => {
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
  ).as(name);
};

export const mockSuccess = (
  method: string,
  url: RegExp | string,
  body: any,
  name = 'request',
): void => {
  cy.intercept(
    {
      method,
      url,
    },
    {
      statusCode: 200,
      body,
    },
  ).as(name);
};
