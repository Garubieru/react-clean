import { RemoteSurveyResultModel } from '@/data/models';
import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { ForbiddenError, UnexpectedError } from '@/domain/errors';
import { SaveSurveyResult } from '@/domain/usecases';

export namespace RemoteSaveSurveyResult {
  export type Model = RemoteSurveyResultModel;
}

export class RemoteSaveSurveyResult implements SaveSurveyResult {
  constructor(
    private readonly httpClient: HttpClient<RemoteSaveSurveyResult.Model>,
    private readonly url: string,
  ) {}

  async save(params: SaveSurveyResult.Params): Promise<SaveSurveyResult.Model> {
    const { statusCode, body } = await this.httpClient.request({
      url: this.url,
      method: 'put',
      body: params,
    });

    switch (statusCode) {
      case HttpStatusCode.ok: {
        return { ...body, date: new Date(body.date) };
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
