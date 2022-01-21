import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { SurveyModel } from '@/domain/models';
import { mockSurveyList } from '@/domain/test';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import { RemoteLoadSurveyList } from './load-survey-list';

type SutType = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<SurveyModel[]>;
};

const createSut = (url = faker.internet.url()): SutType => {
  const httpGetClientSpy = new HttpGetClientSpy<SurveyModel[]>();
  const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
  return {
    sut,
    httpGetClientSpy,
  };
};

describe('RemoteLoadSurveyList', () => {
  it('Should call httpGetClient with correct url', async () => {
    const url = faker.internet.url();
    const { sut, httpGetClientSpy } = createSut(url);
    await sut.list();
    expect(httpGetClientSpy.url).toBe(url);
  });

  it('Should throw ForbiddenError on 403', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.list();
    await expect(promise).rejects.toThrow(new ForbiddenError());
  });

  it('Should throw UnexpectedError on 401', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.list();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError on 400', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.badRequest,
    };
    const promise = sut.list();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError on 404', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.list();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should throw UnexpectedError on 500', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    };
    const promise = sut.list();
    await expect(promise).rejects.toThrow(new UnexpectedError());
  });

  it('Should return empty array on 204', async () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    };
    const surveyList = await sut.list();
    expect(surveyList.length).toEqual(0);
  });

  it('Should return correct response body on 200', async () => {
    const { sut, httpGetClientSpy } = createSut();
    const responseBody = mockSurveyList();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };
    const surveyList = await sut.list();
    expect(surveyList).toEqual(responseBody);
  });
});
