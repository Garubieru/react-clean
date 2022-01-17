import { HttpGetClientSpy } from '@/data/test';
import { SurveyModel } from '@/domain/models';
import { RemoteLoadSurveyList } from './load-survey-list';
import faker from 'faker';

type SutType = {
  sut: RemoteLoadSurveyList;
  httpGetClientSpy: HttpGetClientSpy<any, SurveyModel[]>;
};

const createSut = (url = faker.internet.url()): SutType => {
  const httpGetClientSpy = new HttpGetClientSpy<any, SurveyModel[]>();
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
});
