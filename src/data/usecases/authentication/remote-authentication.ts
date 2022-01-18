import { HttpStatusCode, HttpPostClient } from '@/data/protocols/http';
import { InvalidCredentialError, UnexpectedError } from '@/domain/errors';
import { AuthenticationParams, AuthenticationProtocol } from 'domain/usecases';
import { AccountModel } from '@/domain/models';

export class RemoteAuthentication implements AuthenticationProtocol {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>,
  ) {}

  async auth(params: AuthenticationParams): Promise<AccountModel> {
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
