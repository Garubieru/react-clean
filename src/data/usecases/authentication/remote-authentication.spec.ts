import { HttpPostClientSpy } from '../../test/mock-http-client';
import { RemoteAuthentication } from './remote-authentication';

type SutTypes = {
  sut: RemoteAuthentication;
  httpPostClientSpy: HttpPostClientSpy;
};

const createSut = (url: string = 'test_url'): SutTypes => {
  const httpPostClientSpy = new HttpPostClientSpy();
  const sut = new RemoteAuthentication(url, httpPostClientSpy);
  return { sut, httpPostClientSpy };
};

describe('RemoteAuthentication', () => {
  it('Should call HttpPostClient with correct URL', async () => {
    const url = 'any_url';
    const { sut, httpPostClientSpy } = createSut(url);
    const httpPostSpy = jest.spyOn(httpPostClientSpy, 'post');
    await sut.auth();
    expect(httpPostSpy).toBeCalledWith(url);
    expect(httpPostClientSpy.url).toBe(url);
  });
});
