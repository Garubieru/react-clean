import faker from 'faker';
import { LocalStoreAccessToken } from './local-store.access-token';
import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';

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

  it('Should throw error if setStorage throws', async () => {
    const { setStorageMock, sut } = createSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.store(faker.datatype.uuid());
    await expect(promise).rejects.toThrow(new Error());
  });

  it('Should throw error if LocalStorageAccessToken.store is called with undefined', async () => {
    const { sut } = createSut();
    const result = sut.store(undefined);
    await expect(result).rejects.toThrow(new UnexpectedError());
  });
});
