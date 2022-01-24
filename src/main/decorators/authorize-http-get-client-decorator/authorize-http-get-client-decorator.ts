import { GetStorage } from '@/data/protocols/cache';
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpGetClient: HttpGetClient,
  ) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    const userAccountToken = this.getStorage.get('userAccount');
    this.httpGetClient.get({
      url: params.url,
      headers: { Authorization: userAccountToken },
    });
    return await Promise.resolve(null);
  }
}
