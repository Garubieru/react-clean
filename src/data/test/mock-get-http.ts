import {
  HttpGetClient,
  HttpGetParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';

export class HttpGetClientSpy<T, R> implements HttpGetClient<T, R> {
  url: string;
  body: T;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async get(params: HttpGetParams<T>): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return await Promise.resolve(this.response);
  }
}
