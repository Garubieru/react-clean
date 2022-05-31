import faker from 'faker';
import { HttpStatusCode } from '@/data/protocols/http';
import { GetStorageSpy, HttpClientSpy, mockHttpRequestParams } from '@/data/test';
import { mockAccount } from '@/domain/test';
import { AuthorizeHttpClientDecorator } from '@/main/decorators';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  httpClientSpy: HttpClientSpy<any>;
  sut: AuthorizeHttpClientDecorator;
};

const createSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpClientSpy = new HttpClientSpy();
  const sut = new AuthorizeHttpClientDecorator(getStorageSpy, httpClientSpy);
  return {
    getStorageSpy,
    sut,
    httpClientSpy,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Should call getStorage with correct value', async () => {
    const { sut, getStorageSpy } = createSut();
    await sut.request(mockHttpRequestParams());
    expect(getStorageSpy.key).toBe('userAccount');
  });

  it('Should not add accessToken if getStorage returns empty value', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = null;

    const mockRequest = mockHttpRequestParams();
    mockRequest.headers = null;

    await sut.request(mockRequest);
    expect(httpClientSpy.url).toBe(mockRequest.url);
    expect(httpClientSpy.body).toBe(mockRequest.body);
    expect(httpClientSpy.method).toBe(mockRequest.method);
    expect(httpClientSpy.headers).toEqual(mockRequest.headers);
  });

  it('Should add headers to httpGetClient if has accessToken ', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = mockAccount();

    const mockRequest = mockHttpRequestParams();
    mockRequest.headers = null;

    await sut.request(mockRequest);
    expect(httpClientSpy.headers).toEqual({
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('Should keep previous headers if has accessToken', async () => {
    const { sut, httpClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = mockAccount();

    const mockRequest = mockHttpRequestParams();
    await sut.request(mockRequest);

    expect(httpClientSpy.headers).toEqual({
      ...mockRequest.headers,
      'x-access-token': getStorageSpy.value.accessToken,
    });
  });

  it('Should httpGetClient return correct response', async () => {
    const { sut, httpClientSpy } = createSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: faker.random.objectElement(),
    };
    const result = await sut.request(mockHttpRequestParams());
    expect(result).toEqual(httpClientSpy.response);
  });
});
