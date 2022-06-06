import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { SaveSurveyResult } from '@/domain/usecases';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import { HttpClientSpy } from '@/data/test/mock-http';
import { RemoteSaveSurveyResult } from './remote-save-survey-result';
import { mockRemoteSurveyResult } from '@/data/test';

export type SutTypes = {
  httpClientSpy: HttpClientSpy<any>;
  sut: RemoteSaveSurveyResult;
};

const createSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteSaveSurveyResult.Model>();
  const sut = new RemoteSaveSurveyResult(httpClientSpy, url);

  return { httpClientSpy, sut };
};

const mockSaveResultParams = (): SaveSurveyResult.Params => {
  return { answer: faker.datatype.uuid() };
};

describe('RemoteSaveSurveyResult', () => {
  it('Should call httpClient.request with correct params', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = createSut(url);
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: mockRemoteSurveyResult(),
    };
    const params = mockSaveResultParams();
    await sut.save(params);
    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.body).toEqual(params);
    expect(httpClientSpy.method).toBe('put');
    expect(httpClientSpy.headers).toBeFalsy();
  });

  it('Should return correct body on 200', async () => {
    const { sut, httpClientSpy } = createSut();
    const responseBody = mockRemoteSurveyResult();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: responseBody,
    };
    const output = await sut.save(mockSaveResultParams());
    expect(output).toEqual({ ...responseBody, date: new Date(responseBody.date) });
  });

  it('Should throw ForbiddenError on 403', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.save(mockSaveResultParams());
    await expect(promise).rejects.toBeInstanceOf(ForbiddenError);
  });

  it('Should throw UnexpectedError on 401', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.unauthorized,
    };
    const promise = sut.save(mockSaveResultParams());
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });

  it('Should throw UnexpectedError on 404', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound,
    };
    const promise = sut.save(mockSaveResultParams());
    await expect(promise).rejects.toBeInstanceOf(UnexpectedError);
  });
});
