import { HttpStatusCode } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { ForbiddenError } from '@/domain/errors';
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
  it('Should call httpGetClient with correct url', () => {
    const url = faker.internet.url();
    const { httpGetClientSpy, sut } = createSut(url);
    sut.load();
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
});
