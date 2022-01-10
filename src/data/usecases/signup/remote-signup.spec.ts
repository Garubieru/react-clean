import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { mockAccount, mockAccountCreation } from '@/domain/test';
import { AccountParams } from '@/domain/usecases/signup';
import { RemoteSignup } from './remote-signup';
import { AccountModel } from '@/domain/models';

type SutTypes = {
  sut: RemoteSignup;
  httpPostClientSpy: HttpPostClientSpy<AccountParams, AccountModel>;
};

const createSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<AccountParams, AccountModel>();
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

  it('Should throw AccountCadastratedError if httpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.create(mockAccountCreation());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return AccountModel if httpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockedAccount = mockAccount();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockedAccount,
    };
    const account = await sut.create(mockAccountCreation());
    expect(account).toBe(mockedAccount);
  });
});
