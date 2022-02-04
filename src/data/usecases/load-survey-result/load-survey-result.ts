import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { ForbiddenError } from '@/domain/errors';

export class RemoteLoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async load(): Promise<void> {
    const { statusCode } = await this.httpGetClient.get({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.forbidden: {
        throw new ForbiddenError();
      }
    }
  }
}
