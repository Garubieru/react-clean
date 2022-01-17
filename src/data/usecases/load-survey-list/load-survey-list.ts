import { HttpGetClient } from '@/data/protocols/http';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

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
