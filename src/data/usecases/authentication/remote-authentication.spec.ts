import faker from 'faker';
import { RemoteAuthentication } from './remote-authentication';
import { mockAuthentication, mockAccount } from '@/domain/test/mock-account';
import { HttpPostClientSpy } from '@/data/test/mock-http-client';
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error';
import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { UnexpectedError } from '@/domain/errors/unexpect-error';
import { AuthenticationParams } from '@/domain/usecases/authentication';
import { AccountModel } from '@/domain/models/account-model';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy<AuthenticationParams, AccountModel>;
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AuthenticationParams, AccountModel>();
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
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new InvalidCredentialError());
  });

  it('Should throw UnexpectedError when response returns 400 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 404 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError when response returns 500 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.auth(mockAuthentication());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return AccountModel when response returns 200 statusCode', async () => {
    const { sut, httpPostClientSpy } = createSut();

    const responseBody = mockAccount();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };

    const data = await sut.auth(mockAuthentication());
    expect(responseBody).toEqual(data);
  });
});
