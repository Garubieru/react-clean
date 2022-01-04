import { HttpStatusCode } from '@/data/protocols/http/http-response';
import { InvalidCredentialError } from '@/domain/errors/invalid-credentials-error';
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
    if (statusCode === HttpStatusCode.unathorized) throw new InvalidCredentialError();
    return data;
  }
}
