import { GetStorage } from '@/data/protocols/cache';
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const account: AccountModel = JSON.parse(this.getStorage.get('userAccount'));
    if (account?.accessToken) {
      Object.assign(params, {
        headers: {
          'x-access-token': account?.accessToken,
        },
      });
    }
    this.httpGetClient.get(params);
    return await Promise.resolve(null);
  }
}
