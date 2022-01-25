import { HttpGetClient, HttpStatusCode } from '@/data/protocols/http';
import { LoadSurveyList } from '@/domain/usecases';

import { UnexpectedError, ForbiddenError } from '@/domain/errors';

export namespace RemoteLoadSurveyList {
  export type Model = {
    id: string;
    question: string;
    date: string;
    didAnswer: boolean;
  };
}

export class RemoteLoadSurveyList implements LoadSurveyList {
  constructor(
    private readonly url: string,
    private readonly httpGetClient: HttpGetClient<RemoteLoadSurveyList.Model[]>,
  ) {}

  async list(): Promise<LoadSurveyList.Model[]> {
    const { body, statusCode } = await this.httpGetClient.get({ url: this.url });

    const surveyList = body
      ? body.map((survey) => Object.assign(survey, { date: new Date(survey.date) }))
      : [];

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return surveyList;
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
