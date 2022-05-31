import faker from 'faker';

import { InvalidCredentialError, UnexpectedError } from '@/domain/errors';
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test';
import { Authentication } from '@/domain/usecases';

import { HttpClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';

import { RemoteAuthentication } from './remote-authentication';
type SutTypes = {
  sut: RemoteAuthentication;
  httpClient: HttpClientSpy<Authentication.Model>;
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClient = new HttpClientSpy<Authentication.Model>();
  const sut = new RemoteAuthentication(url, httpClient);
  return { sut, httpClient };
};

describe('RemoteAuthentication', () => {
  it('Should call httpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpClient } = createSut(url);
    await sut.auth(mockAuthenticationParams());
    expect(httpClient.url).toBe(url);
  });

  it('Should call httpClient with correct BODY', async () => {
    const { sut, httpClient } = createSut();
    const mockAuthParams = mockAuthenticationParams();
    await sut.auth(mockAuthParams);
    expect(httpClient.body).toEqual(mockAuthParams);
  });

  it('Should call httpClient with correct METHOD', async () => {
    const { sut, httpClient } = createSut();
    await sut.auth(mockAuthenticationParams());
    expect(httpClient.method).toBe('post');
  });

  it('Should throw InvalidCredentialsError when response returns 401 statusCode', async () => {
    const { sut, httpClient } = createSut();
    httpClient.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });

  it('Should throw UnexpectedError when response returns 400 statusCode', async () => {
    const { sut, httpClient } = createSut();
    httpClient.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 404 statusCode', async () => {
    const { sut, httpClient } = createSut();
    httpClient.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 500 statusCode', async () => {
    const { sut, httpClient } = createSut();
    httpClient.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return Authentication.Model when response returns 200 statusCode', async () => {
    const { sut, httpClient } = createSut();

    const responseBody = mockAuthenticationModel();
    httpClient.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const data = await sut.auth(mockAuthenticationParams());
    expect(responseBody).toEqual(data);
  });
});
