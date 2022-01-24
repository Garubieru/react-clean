import { GetStorage } from '@/data/protocols/cache';
import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';

export class AuthorizeHttpGetClientDecorator implements HttpGetClient {
  constructor(private readonly getStorage: GetStorage) {}

  async get(params: HttpGetParams): Promise<HttpResponse<any>> {
    this.getStorage.get('userAccount');
    return await Promise.resolve(null);
  }
}
