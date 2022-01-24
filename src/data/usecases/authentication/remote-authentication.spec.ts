import faker from 'faker';

import { InvalidCredentialError, UnexpectedError } from '@/domain/errors';
import { mockAuthenticationModel, mockAuthenticationParams } from '@/domain/test';
import { Authentication } from '@/domain/usecases';

import { HttpPostClientSpy } from '@/data/test';
import { HttpStatusCode } from '@/data/protocols/http';

import { RemoteAuthentication } from './remote-authentication';
type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<Authentication.Model>;
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Authentication.Model>();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.auth(mockAuthenticationParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpPostClient with correct BODY', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockAuthParams = mockAuthenticationParams();
    await sut.auth(mockAuthParams);
    expect(httpPostClientSpy.body).toEqual(mockAuthParams);
  });

  it('Should throw InvalidCredentialsError when response returns 401 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });

  it('Should throw UnexpectedError when response returns 400 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 404 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 500 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthenticationParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return Authentication.Model when response returns 200 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();

    const responseBody = mockAuthenticationModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const data = await sut.auth(mockAuthenticationParams());
    expect(responseBody).toEqual(data);
  });
});
