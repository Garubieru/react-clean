import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async load(): Promise<void> {
    const { statusCode } = await this.httpGetClient.get({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return;
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
