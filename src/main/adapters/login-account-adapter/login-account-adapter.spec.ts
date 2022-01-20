import { UnexpectedError } from '@/domain/errors';
import { mockAccount } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter';
import { setLocalLoginAccountAdapter } from './login-account-adapter';

jest.mock('@/infra/cache/local-storage/local-storage-adapter');

describe('LoginAccountAdapter', () => {
  it('Should call LocalStorageAdapter adapter with correct values', () => {
    const mockedAccount = mockAccount();
    const localStorageAdapterSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');
    setLocalLoginAccountAdapter(mockedAccount);
    expect(localStorageAdapterSpy).toHaveBeenCalledWith(
      'userAccount',
      JSON.stringify(mockedAccount),
    );
  });

  it('Should throw UnexpectedError if account is undefined', () => {
    expect(() => setLocalLoginAccountAdapter(undefined)).toThrow(new UnexpectedError());
  });
});
