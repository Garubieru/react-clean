import faker from 'faker';
import * as HttpMocks from '../support/http-mocks';

const method = 'POST';
const url = /login/;

export const mockInvalidLoginError = (): void => {
  HttpMocks.mockUnauthorizedError(method, url);
};

export const mockUnexpectedLoginError = (): void => {
  HttpMocks.mockServerError(method, url);
};

export const mockSuccessLogin = (): void => {
  HttpMocks.mockSuccess(method, url, {
    accessToken: faker.datatype.uuid(),
    name: faker.name.findName(),
  });
};
