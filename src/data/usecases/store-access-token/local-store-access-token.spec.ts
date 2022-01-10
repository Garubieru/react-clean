import faker from 'faker';
import { LocalStoreAccessToken } from './local-store.access-token';
import { SetStorageMock } from '@/data/test';

type SutTypes = {
  setStorageMock: SetStorageMock;
  sut: LocalStoreAccessToken;
};

const createSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalStoreAccessToken(setStorageMock);
  return {
    setStorageMock,
    sut,
  };
};

describe('LocalStoreAccessToken', () => {
  it('Should call setStorage with correct value', async () => {
    const { setStorageMock, sut } = createSut();
    const accessToken = faker.datatype.uuid();
    await sut.store(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
});
