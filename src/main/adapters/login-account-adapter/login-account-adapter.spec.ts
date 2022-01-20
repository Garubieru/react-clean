import { UnexpectedError } from '@/domain/errors';
import { mockAccount } from '@/domain/test';
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter';
import {
  setLocalLoginAccountAdapter,
  getLocalLoginAccountAdapter,
} from './login-account-adapter';

jest.mock('@/infra/cache/local-storage/local-storage-adapter');

describe('LoginAccountAdapter', () => {
  beforeEach(() => jest.clearAllMocks());

  describe('set', () => {
    it('Should call LocalStorageAdapter.set with correct values', () => {
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

  describe('get', () => {
    it('Should LocalStorageAdapter.get return correct values', () => {
      const mockedAccount = mockAccount();
      const localStorageAdapterGetSpy = jest
        .spyOn(LocalStorageAdapter.prototype, 'get')
        .mockReturnValueOnce(JSON.stringify(mockedAccount));
      const result = getLocalLoginAccountAdapter();
      expect(localStorageAdapterGetSpy).toHaveBeenCalledWith('userAccount');
      expect(result).toEqual(mockedAccount);
    });
  });
});
