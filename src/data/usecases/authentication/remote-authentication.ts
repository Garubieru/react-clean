import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error';
import { UnexpectedError } from '@/domain/errors/unexpect-error';
import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { AuthenticationParams } from 'domain/usecases/authentication';

export class RemoteAuthentication {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient,
  ) {}

  async auth(params: AuthenticationParams): Promise<any> {
    const { statusCode, data } = await this.httpPostClient.post<any>({
      url: this.url,
      body: params,
    });
    switch (statusCode) {
      case HttpStatusCode.unathorized:
        throw new InvalidCredentialError();
      case HttpStatusCode.badRequest:
        throw new UnexpectedError();
      default:
    }
    return data;
  }
}
