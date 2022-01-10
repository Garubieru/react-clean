import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { AccountCadastratedError, UnexpectedError } from '@/domain/errors';
import { mockAccountCreation } from '@/domain/test';
import { AccountParams } from '@/domain/usecases/signup';
import { RemoteSignup } from './remote-signup';

type SutTypes = {
  sut: RemoteSignup;
  httpPostClientSpy: HttpPostClientSpy<AccountParams, void>;
};

const createSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountParams, void>();
  const sut = new RemoteSignup(url, httpPostClientSpy);
  return {
    sut,
    httpPostClientSpy,
  };
};

describe('CreateAccount', () => {
  it('Should call httpPostClient with correct URL', async () => {
    const url = faker.internet.url();
    const { sut, httpPostClientSpy } = createSut(url);
    await sut.create(mockAccountCreation());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call httpPostClient with correct BODY', async () => {
    const body = mockAccountCreation();
    const { sut, httpPostClientSpy } = createSut();
    await sut.create(body);
    expect(httpPostClientSpy.body).toEqual(body);
  });

  it('Should throw AccountCadastratedError if account email already exists', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new AccountCadastratedError());
  });

  it('Should throw UnexpectedError if any error occurrs', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return response body if account creation succeed', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.created,
      body: null,
    };
    const account = await sut.create(mockAccountCreation());
    expect(account).toBe(null);
  });
});
