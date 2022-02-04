import { HttpGetClientSpy } from '@/data/test';
import { RemoteLoadSurveyResult } from '@/data/usecases';
import faker from 'faker';

describe('RemoteLoadSurveyResult', () => {
  it('Should call httpGetClient with correct url', () => {
    const url = faker.internet.url();
    const httpGetClient = new HttpGetClientSpy();
    const sut = new RemoteLoadSurveyResult(url, httpGetClient);
    sut.load();
    expect(httpGetClient.url).toBe(url);
  });
});
