import { HttpStatusCode } from '@/data/protocols/http';
import { HttpClientSpy, mockRemoteSurveyResult } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import faker from 'faker';

type SutType = {
  sut: RemoteLoadSurveyResult;
  httpClientSpy: HttpClientSpy<any>;
};

const createSut = (url = faker.internet.url()): SutType => {
  const httpClientSpy = new HttpClientSpy<any>();
  const sut = new RemoteLoadSurveyResult(url, httpClientSpy);
  return {
    sut,
    httpClientSpy,
  };
};

describe('RemoteLoadSurveyResult', () => {
  it('Should call httpClient with correct url and method', async () => {
    const url = faker.internet.url();
    const { httpClientSpy, sut } = createSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResult(),
    };
    await sut.load();
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('get');
  });

  it('Should throw ForbiddenError on 403', async () => {
    const { httpClientSpy, sut } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(ForbiddenError);
  });

  it('Should throw UnexpectedError on 404', async () => {
    const { httpClientSpy, sut } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should throw UnexpectedError on 500', async () => {
    const { httpClientSpy, sut } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should throw UnexpectedError on 400', async () => {
    const { httpClientSpy, sut } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should return correct survey on 200', async () => {
    const { httpClientSpy, sut } = createSut();
    const httpResponseMock = mockRemoteSurveyResult();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponseMock,
    };
    const survey = await sut.load();
    expect(survey).toEqual({
      question: httpResponseMock.question,
      date: new Date(httpResponseMock.date),
      answers: httpResponseMock.answers,
    });
  });
});
