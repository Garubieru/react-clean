import faker from 'faker';
import { RemoteAuthentication } from './remote-authentication';
import { mockAuthentication } from '@/domain/test/mock-authentication';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpect-error';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.auth(mockAuthentication());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call HttpPostClient with correct BODY', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockAuthParams = mockAuthentication();
    await sut.auth(mockAuthParams);
    expect(httpPostClientSpy.body).toEqual(mockAuthParams);
  });

  it('Should throw InvalidCredentialsError when response returns 401 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.unathorized,
      data: '',
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });

  it('Should throw UnexpectedError when response returns 400 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
      data: '',
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 404 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
      data: '',
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 500 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
      data: '',
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });
});
