import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { LoadSurveyList } from '@/domain/usecases';
import { SurveyModel } from '@/domain/models';

import { UnexpectedError, ForbiddenError } from '@/domain/errors';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<any, SurveyModel[]>,
  ) {}

  async list(): Promise<SurveyModel[]> {
    const { body, statusCode } = await this.httpGetClient.get({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return body;
      }
      case HttpStatusCode.forbidden: {
        throw new ForbiddenError();
      }
      default: {
        throw new UnexpectedError();
      }
    }
  }
}
