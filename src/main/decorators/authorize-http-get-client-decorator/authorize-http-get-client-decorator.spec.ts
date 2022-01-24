import { GetStorageSpy, HttpGetClientSpy, mockGetParams } from '@/data/test';
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
  it('Should call getStorage with correct value', () => {
    const { sut, getStorageSpy } = createSut();
    sut.get(mockGetParams());
    expect(getStorageSpy.key).toBe('userAccount');
  });

  it('Should call httpGetClient with correct values', () => {
    const { sut, httpGetClientSpy, getStorageSpy } = createSut();

    const mockedHeaders = { Authorization: getStorageSpy.value };

    const mockedRequest = {
      url: faker.internet.url(),
      headers: mockedHeaders,
    };
    sut.get(mockedRequest);

    expect(httpGetClientSpy.url).toBe(mockedRequest.url);
    expect(httpGetClientSpy.headers).toEqual(mockedHeaders);
  });
});
