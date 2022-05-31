import { GetStorage } from '@/data/protocols/cache';
import { HttpClient, HttpResponse, HttpRequest } from '@/data/protocols/http';
import { AccountModel } from '@/domain/models';

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient,
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse<any>> {
    const account = this.getStorage.get<AccountModel>('userAccount');
    if (account?.accessToken) {
      const parsedHeaders = Object.assign(data.headers || {}, {
        'x-access-token': account.accessToken,
      });
      data.headers = parsedHeaders;
    }
    return await this.httpClient.request(data);
  }
}
