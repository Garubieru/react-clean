import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http';
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors';
import { Authentication } from 'domain/usecases';

export namespace RemoteAuthentication {
  export type Model = Authentication.Model;
}

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<RemoteAuthentication.Model>,
  ) {}

  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.unauthorized:
        throw new InvalidCredentialError();
      default:
        throw new UnexpectedError();
    }
  }
}
