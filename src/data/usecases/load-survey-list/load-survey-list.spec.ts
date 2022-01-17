import { HttpGetClient } from '@/data/protocols/http';
import { HttpGetClientSpy } from '@/data/test';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';
import faker from 'faker';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, SurveyModel[]>,
  ) {}

  async list(): Promise<SurveyModel[]> {
    const { body } = await this.httpGetClient.get({ url: this.url });
    return body;
  }
}

describe('RemoteLoadSurveyList', () => {
  it('Should call httpGetClient with correct url', async () => {
    const httpGetClientSpy = new HttpGetClientSpy<any, SurveyModel[]>();
    const url = faker.internet.url();
    const sut = new RemoteLoadSurveyList(url, httpGetClientSpy);
    await sut.list();
    expect(httpGetClientSpy.url).toBe(url);
  });
});
