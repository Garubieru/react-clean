import { HttpGetClient } from '@/data/protocols/http';
import { SurveyModel } from '@/domain/models';
import { LoadSurveyList } from '@/domain/usecases';

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
  it('Should call httpGetClient with correct url', () => {});
});
