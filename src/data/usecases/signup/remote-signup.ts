import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { AccountParams, RemoteSignupProtocol } from '@/domain/usecases/signup';

export class RemoteSignup implements RemoteSignupProtocol {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountModel>,
  ) {}

  async create(params: AccountParams): Promise<AccountModel> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (statusCode) {
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.forbidden:
        throw new EmailInUseError();
      default:
        throw new UnexpectedError();
    }
  }
}
