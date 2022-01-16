import * as HttpMocks from './http-mocks';
import faker from 'faker';

const method = 'POST';
const url = /signup/;

export const mockEmailInUseSignupError = (): void =>
  HttpMocks.mockEmailInUseError(method, url);

export const mockUnexpectedSignupError = (): void =>
  HttpMocks.mockUnexpectedError(method, url);

export const mockInvalidSignupSuccess = (): void => {
  HttpMocks.mockSuccess(method, url, { invalid: faker.datatype.uuid() });
};

export const mockSignupSuccess = (): void =>
  HttpMocks.mockSuccess(method, url, { accessToken: faker.datatype.uuid() });
