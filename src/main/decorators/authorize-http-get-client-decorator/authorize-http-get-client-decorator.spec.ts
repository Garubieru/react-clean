import { GetStorageSpy, HttpGetClientSpy, mockGetParams } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';

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
    const { sut, httpGetClientSpy } = createSut();
    const mockedParams = mockGetParams();
    sut.get(mockedParams);
    expect(httpGetClientSpy.url).toBe(mockedParams.url);
    expect(httpGetClientSpy.headers).toEqual(mockedParams.headers);
  });
});
