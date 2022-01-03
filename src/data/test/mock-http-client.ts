import { HttpPostClient } from 'data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  public url: string | null = null;
  async post(url: string): Promise<void> {
    this.url = url;
  }
}
