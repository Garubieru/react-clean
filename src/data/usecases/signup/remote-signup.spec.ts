import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { mockSignupModel, mockSignupParams } from '@/domain/test';
import { Signup } from '@/domain/usecases';
import { RemoteSignup } from './remote-signup';

type SutTypes = {
  sut: RemoteSignup;
  httpClientSpy: HttpClientSpy<Signup.Model>;
};

const createSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<Signup.Model>();
  const sut = new RemoteSignup(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('CreateAccount', () => {
  it('Should call httpClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = createSut(url);
    await sut.create(mockSignupParams());
    expect(httpClientSpy.url).toBe(url);
  });

  it('Should call httpClient with correct BODY', async () => {
    const body = mockSignupParams();
    const { sut, httpClientSpy } = createSut();
    await sut.create(body);
    expect(httpClientSpy.body).toEqual(body);
  });

  it('Should call httpClient with correct METHOD', async () => {
    const { sut, httpClientSpy } = createSut();
    await sut.create(mockSignupParams());
    expect(httpClientSpy.method).toBe('post');
  });

  it('Should throw AccountCadastratedError if httpClient returns 403', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if httpClient returns 400', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpClient returns 500', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpClient returns 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return Signup.Model if httpClient returns 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const mockedAccount = mockSignupModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockedAccount,
    };
    const account = await sut.create(mockSignupParams());
    expect(account).toBe(mockedAccount);
  });
});
