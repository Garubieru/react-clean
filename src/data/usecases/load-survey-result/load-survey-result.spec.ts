import { HttpStatusCode } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';

type SutType = {
  sut: RemoteLoadSurveyResult;
  httpGetClientSpy: HttpGetClientSpy<any>;
};

const createSut = (url = faker.internet.url()): SutType => {
  const httpGetClientSpy = new HttpGetClientSpy<any>();
  const sut = new RemoteLoadSurveyResult(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyResult', () => {
  it('Should call httpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const { httpGetClientSpy, sut } = createSut(url);
    await sut.load();
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw ForbiddenError on 403', async () => {
    const { httpGetClientSpy, sut } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(ForbiddenError);
  });

  it('Should throw UnexpectedError on 404', async () => {
    const { httpGetClientSpy, sut } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should throw UnexpectedError on 500', async () => {
    const { httpGetClientSpy, sut } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should throw UnexpectedError on 400', async () => {
    const { httpGetClientSpy, sut } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });
});
