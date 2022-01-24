import { GetStorageSpy, mockGetParams } from '@/data/test';
import { AuthorizeHttpGetClientDecorator } from '@/main/decorators';

describe('AuthorizeHttpGetClientDecorator', () => {
  it('Should call getStorage with correct value', () => {
    const getStorageSpy = new GetStorageSpy();
    const sut = new AuthorizeHttpGetClientDecorator(getStorageSpy);
    sut.get(mockGetParams());
    expect(getStorageSpy.key).toBe('userAccount');
  });
});
