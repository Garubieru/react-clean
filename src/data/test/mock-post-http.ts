import {
  HttpPostClient,
  HttpPostParams,
  HttpResponse,
  HttpStatusCode,
} from '@/data/protocols/http';
import faker from 'faker';

export class HttpPostClientSpy<R> implements HttpPostClient<R> {
  public url: string | null = null;
  public body?: any = null;

  public response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async post(params: HttpPostParams): Promise<HttpResponse<R>> {
    this.url = params.url;
    this.body = params.body;

    return await Promise.resolve(this.response);
  }
}

export const mockPostParams = (): HttpPostParams => ({
  url: faker.internet.url(),
  body: faker.random.objectElement(),
});
