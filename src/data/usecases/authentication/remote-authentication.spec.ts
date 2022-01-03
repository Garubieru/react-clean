import { HttpPostClient } from 'data/protocols/http/http-post-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    class HttpPostClientSpy implements HttpPostClient {
      async post(url: string): Promise<void> {}
    }

    const url = 'test_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    const httpPostSpy = jest.spyOn(httpPostClientSpy, 'post');

    await sut.auth();
    expect(httpPostSpy).toBeCalledWith(url);
  });
});
