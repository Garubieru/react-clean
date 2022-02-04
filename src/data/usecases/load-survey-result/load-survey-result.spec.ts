import { HttpStatusCode } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import { ForbiddenError } from '@/domain/errors';
import faker from 'faker';

describe('RemoteLoadSurveyResult', () => {
  it('Should call httpGetClient with correct url', () => {
    const url = faker.internet.url();
    const httpGetClient = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClient);
    sut.load();
    expect(httpGetClient.url).toBe(url);
  });

  it('Should throw ForbiddenError on 403', async () => {
    const httpGetClient = new HttpGetClientSpy();
    httpGetClient.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const sut = new RemoteLoadSurveyResult(faker.internet.url(), httpGetClient);
    const promise = sut.load();
    await expect(promise).rejects.toBeInstanceOf(ForbiddenError);
  });
});
