import { HttpGetClient, HttpGetParams, HttpResponse } from '@/data/protocols/http';

export class HttpGetClientSpy<T, R> implements HttpGetClient<T, R> {
  url: string;
  body: T;

  async get(params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return await Promise.resolve({ statusCode: null, body: null });
  }
}
