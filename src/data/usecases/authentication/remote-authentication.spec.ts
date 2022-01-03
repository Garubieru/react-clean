import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = 'test_url';
    const httpPostClientSpy = new HttpPostClientSpy();
    const sut = new RemoteAuthentication(url, httpPostClientSpy);
    const httpPostSpy = jest.spyOn(httpPostClientSpy, 'post');

    await sut.auth();
    expect(httpPostSpy).toBeCalledWith(url);
  });
});
