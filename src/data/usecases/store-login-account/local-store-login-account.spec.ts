import { LocalStoreLoginAccount } from './local-store-login-account';
import { SetStorageMock } from '@/data/test';
import { UnexpectedError } from '@/domain/errors';
import { mockAccount } from '@/domain/test';

type SutTypes = {
  setStorageMock: SetStorageMock;
  sut: LocalStoreLoginAccount;
};

const createSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalStoreLoginAccount(setStorageMock);
  return {
    setStorageMock,
    sut,
  };
};

describe('LocalStoreLoginAccount', () => {
  it('Should call setStorage with correct value', async () => {
    const { setStorageMock, sut } = createSut();
    const account = mockAccount();
    await sut.store(account);
    expect(setStorageMock.key).toBe('userAccount');
    expect(setStorageMock.value).toBe(JSON.stringify(account));
  });

  it('Should throw error if setStorage throws', async () => {
    const { setStorageMock, sut } = createSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promise = sut.store(mockAccount());
    await expect(promise).rejects.toThrow(new Error());
  });

  it('Should throw error if LocalStorageAccessToken.store is called with undefined', async () => {
    const { sut } = createSut();
    const result = sut.store(undefined);
    await expect(result).rejects.toThrow(new UnexpectedError());
  });
});
