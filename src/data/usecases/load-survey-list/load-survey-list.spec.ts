import faker from 'faker';
import { HttpGetClientSpy } from '@/data/test';
import { SurveyModel } from '@/domain/models';
import { HttpStatusCode } from '@/data/protocols/http';
import { ForbiddenError } from '@/domain/errors';

import { RemoteLoadSurveyList } from './load-survey-list';

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

  it('Should not call httpGetClient with body param', async () => {
    const { sut, httpGetClientSpy } = createSut();
    await sut.list();
    expect(httpGetClientSpy.body).toBeFalsy();
  });

  it('Should throw ForbiddenError on 403', () => {
    const { sut, httpGetClientSpy } = createSut();
    httpGetClientSpy.response = {
      statusCode: HttpStatusCode.forbidden,
    };
    const promise = sut.list();
    expect(promise).rejects.toThrow(new ForbiddenError());
  });
});
