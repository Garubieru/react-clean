import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { LoadSurveyList } from '@/domain/usecases';

import { UnexpectedError, ForbiddenError } from '@/domain/errors';

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<LoadSurveyList.Model[]>,
  ) {}

  async list(): Promise<LoadSurveyList.Model[]> {
    const { body, statusCode } = await this.httpGetClient.get({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return body;
      }
      case HttpStatusCode.noContent: {
        return [];
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
