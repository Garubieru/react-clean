import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpect-error';
import { AccountModel } from '@/domain/models/account-model';
import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { AuthenticationParams } from 'domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AuthenticationParams, AccountModel>,
  ) {}

  async auth(params: AuthenticationParams): Promise<any> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialError();
      default:
        throw new UnexpectedError();
    }
  }
}
