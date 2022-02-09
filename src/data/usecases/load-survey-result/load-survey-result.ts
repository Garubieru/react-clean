import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import { LoadSurveyResult } from '@/domain/usecases';

export namespace RemoteLoadSurveyResult {
  export type Model = {
    question: string;
    answers: Array<{
      image: string;
      answer: string;
      count: number;
      percent: number;
      isCurrentAccountAnswer: boolean;
    }>;
    date: string;
  };
}

export class RemoteLoadSurveyResult implements LoadSurveyResult {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyResult.Model>,
  ) {}

  async load(): Promise<LoadSurveyResult.Model> {
    const { statusCode, body } = await this.httpGetClient.get({ url: this.url });

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return Object.assign(body, { date: new Date(body.date) });
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
