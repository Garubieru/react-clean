import { HttpPostClient } from 'data/protocols/http/http-post-client';

export class HttpPostClientSpy implements HttpPostClient {
  async post(url: string): Promise<void> {}
}
