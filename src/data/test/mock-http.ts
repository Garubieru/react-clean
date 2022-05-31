import {
  HttpClient,
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpMethods,
} from '@/data/protocols/http';
import faker from 'faker';

export class HttpClientSpy<R> implements HttpClient<R> {
  url: string;
  headers: any;
  method: HttpMethods;
  body: string;

  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.headers = data.headers;
    this.method = data.method;
    this.body = data.body;

    return await Promise.resolve(this.response);
  }
}

export const mockHttpRequestParams = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.random.arrayElement(['post', 'delete', 'get', 'put']),
  headers: { any_key: faker.datatype.string() },
  body: faker.random.objectElement(),
});
