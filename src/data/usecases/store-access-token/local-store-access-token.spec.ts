import faker from 'faker';
import { LocalStoreAccessToken } from './local-store.access-token';
import { SetStorageSpy } from '@/data/test';

type SutTypes = {
  setStorageSpy: SetStorageSpy;
  sut: LocalStoreAccessToken;
};

const createSut = (): SutTypes => {
  const setStorageSpy = new SetStorageSpy();
  const sut = new LocalStoreAccessToken(setStorageSpy);
  return {
    setStorageSpy,
    sut,
  };
};

describe('LocalStoreAccessToken', () => {
  it('Should call setStorage with correct value', async () => {
    const { setStorageSpy, sut } = createSut();
    const accessToken = faker.datatype.uuid();
    await sut.store(accessToken);
    expect(setStorageSpy.key).toBe('accessToken');
    expect(setStorageSpy.value).toBe(accessToken);
  });
});
