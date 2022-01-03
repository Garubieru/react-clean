import { HttpPostClient } from 'data/protocols/http/http-post-protocol';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      public url: string | null = null;
      async post(url: string): Promise<void> {
        this.url = url;
      }
    }

    const url = 'test_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    await sut.auth();
    expect(httpPostClientSpy.url).toBe(url);
  });
});
