import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/http-response';

export class HttpPostClientSpy implements HttpPostClient {
  public url: string | null = null;
  public body: any | null = null;

  public response: HttpResponse<any> = {
    statusCode: HttpStatusCode.ok,
    data: this.body,
  };

  async post<TResponse>(params: HttpPostParams): Promise<HttpResponse<TResponse>> {
    this.url = params.url;
    this.body = params.body;

    return await Promise.resolve(this.response);
  }
}
