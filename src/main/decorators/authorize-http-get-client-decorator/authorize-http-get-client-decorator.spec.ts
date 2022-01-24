import { HttpGetParams } from '@/data/protocols/http';
import { GetStorageSpy, HttpGetClientSpy, mockGetParams } from '@/data/test';
import { mockAccount } from '@/domain/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';
import faker from 'faker';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  httpGetClientSpy: HttpGetClientSpy<any>;
  sut: AuthorizeHttpGetClientDecorator;
};

const createSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const httpGetClientSpy = new HttpGetClientSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy, httpGetClientSpy);
  return {
    getStorageSpy,
    sut,
    httpGetClientSpy,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  beforeEach(() => jest.clearAllMocks());
  it('Should call getStorage with correct value', async () => {
    const { sut, getStorageSpy } = createSut();
    await sut.get(mockGetParams());
    expect(getStorageSpy.key).toBe('userAccount');
  });

  it('Should not add accessToken if getStorage returns empty value', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = null;

    const mockRequest: HttpGetParams = {
      url: faker.internet.url(),
    };

    await sut.get(mockRequest);
    expect(httpGetClientSpy.url).toBe(mockRequest.url);
    expect(httpGetClientSpy.headers).toEqual(mockRequest.headers);
  });

  it('Should add headers to httpGetClient if has accessToken ', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = JSON.stringify(mockAccount());

    const mockRequest: HttpGetParams = {
      url: faker.internet.url(),
    };

    await sut.get(mockRequest);
    expect(httpGetClientSpy.url).toBe(mockRequest.url);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': JSON.parse(getStorageSpy.value).accessToken,
    });
  });

  it('Should keep previous headers if has accessToken', async () => {
    const { sut, httpGetClientSpy, getStorageSpy } = createSut();
    getStorageSpy.value = JSON.stringify(mockAccount());

    const mockRequest: HttpGetParams = {
      url: faker.internet.url(),
      headers: {
        field: faker.random.word(),
      },
    };

    await sut.get(mockRequest);
    expect(httpGetClientSpy.headers).toEqual({
      'x-access-token': JSON.parse(getStorageSpy.value).accessToken,
      field: mockRequest.headers.field,
    });
  });
});
