import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { EmailInUseError, UnexpectedError } from '@/domain/errors';
import { Signup } from '@/domain/usecases/signup';

export namespace RemoteSignup {
  export type Model = Signup.Model;
}

export class RemoteSignup implements Signup {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteSignup.Model>,
  ) {}

  async create(params: Signup.Params): Promise<Signup.Model> {
    const { statusCode, body } = await this.httpClient.request({
      method: 'post',
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
