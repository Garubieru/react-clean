import faker from 'faker';
import * as HttpMocks from '../support/http-mocks';

const method = 'POST';
export const mockInvalidLoginError = (): void =>
  HttpMocks.mockInvalidCredentials(method, /login/);

export const mockUnexpectedLoginError = (): void =>
  HttpMocks.mockUnexpectedError(method, /login/);

export const mockSuccessLogin = (): void =>
  HttpMocks.mockSuccess(method, /login/, { accessToken: faker.datatype.uuid() });

export const mockSuccessInvalidData = (): void =>
  HttpMocks.mockSuccess(method, /login/, { invalid: faker.datatype.uuid() });
