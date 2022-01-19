import { UnexpectedError } from '@/domain/errors';
import { mockAccount } from '@/domain/test';
import { SetLocalStorageAdapter } from '@/infra/cache/local-storage/set-local-storage-adapter';
import { setLocalLoginAccountAdapter } from './login-account-adapter';

jest.mock('@/infra/cache/local-storage/set-local-storage-adapter');

describe('LoginAccountAdapter', () => {
  it('Should call SetLocalStorageAdapter adapter with correct values', () => {
    const mockedAccount = mockAccount();
    const setLocalStorageAdapterSpy = jest.spyOn(SetLocalStorageAdapter.prototype, 'set');
    setLocalLoginAccountAdapter(mockedAccount);
    expect(setLocalStorageAdapterSpy).toHaveBeenCalledWith(
      'userAccount',
      JSON.stringify(mockedAccount),
    );
  });

  it('Should throw UnexpectedError if account is undefined', () => {
    expect(() => setLocalLoginAccountAdapter(undefined)).toThrow(new UnexpectedError());
  });
});
