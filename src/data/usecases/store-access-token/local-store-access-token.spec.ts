import faker from 'faker';
import { LocalStoreAccessToken } from './local-store.access-token';
import { SetStorageSpy } from '@/data/test';

describe('LocalStoreAccessToken', () => {
  it('Should call setStorage with correct value', async () => {
    const setStorageSpy = new SetStorageSpy();
    const sut = new LocalStoreAccessToken(setStorageSpy);
    const accessToken = faker.datatype.uuid();
    await sut.store(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
