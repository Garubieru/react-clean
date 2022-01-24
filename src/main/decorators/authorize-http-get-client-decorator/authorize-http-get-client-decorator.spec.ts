import { GetStorageSpy, mockGetParams } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';

type SutTypes = {
  getStorageSpy: GetStorageSpy;
  sut: AuthorizeHttpGetClientDecorator;
};

const createSut = (): SutTypes => {
  const getStorageSpy = new GetStorageSpy();
  const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
  return {
    getStorageSpy,
    sut,
  };
};

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call getStorage with correct value', () => {
    const { sut, getStorageSpy } = createSut();
    sut.get(mockGetParams());
    expect(getStorageSpy.key).toBe('userAccount');
  });
});
