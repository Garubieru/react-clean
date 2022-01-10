import { HttpPostClient, HttpStatusCode } from '@/data/protocols/http';
import { AccountCadastratedError, UnexpectedError } from '@/domain/errors';
import { AccountParams, SigninProtocol } from '@/domain/usecases/signup';

export class CreateAccount implements SigninProtocol {
  constructor(
    private readonly url: string,
    private readonly httpPostClient: HttpPostClient<AccountParams, void>,
  ) {}

  async create(params: AccountParams): Promise<void> {
    const { statusCode, body } = await this.httpPostClient.post({
      url: this.url,
      body: params,
    });
    switch (statusCode) {
      case HttpStatusCode.created:
      case HttpStatusCode.ok:
        return body;
      case HttpStatusCode.forbidden:
        throw new AccountCadastratedError();
      default:
        throw new UnexpectedError();
    }
  }
}
