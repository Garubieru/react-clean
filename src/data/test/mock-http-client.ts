import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  public url: string | null = null;
  public body: unknown | null = null;
  async post(params: HttpPostParams): Promise<void> {
    const { url, body } = params;
    this.url = url;
    this.body = body;
  }
}
