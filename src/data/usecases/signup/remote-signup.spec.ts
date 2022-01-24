import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpPostClientSpy } from '@/data/test';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { mockSignupModel, mockSignupParams } from '@/domain/test';
import { Signup } from '@/domain/usecases';
import { RemoteSignup } from './remote-signup';

type SutTypes = {
  sut: RemoteSignup;
  httpPostClientSpy: HttpPostClientSpy<Signup.Model>;
};

const createSut = (url = faker.internet.url()): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy<Signup.Model>();
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
    await sut.create(mockSignupParams());
    expect(httpPostClientSpy.url).toBe(url);
  });

  it('Should call httpPostClient with correct BODY', async () => {
    const body = mockSignupParams();
    const { sut, httpPostClientSpy } = createSut();
    await sut.create(body);
    expect(httpPostClientSpy.body).toEqual(body);
  });

  it('Should throw AccountCadastratedError if httpPostClient returns 403', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new EmailInUseError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 400', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 500', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError if httpPostClient returns 404', async () => {
    const { sut, httpPostClientSpy } = createSut();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.create(mockSignupParams());
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return Signup.Model if httpPostClient returns 200', async () => {
    const { sut, httpPostClientSpy } = createSut();
    const mockedAccount = mockSignupModel();
    httpPostClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockedAccount,
    };
    const account = await sut.create(mockSignupParams());
    expect(account).toBe(mockedAccount);
  });
});
