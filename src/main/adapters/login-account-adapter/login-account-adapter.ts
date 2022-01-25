import { AccountModel } from '@/domain/models';
import { createLocalStorage } from '@/main/factories';

export const setLocalLoginAccountAdapter = (account: AccountModel): void => {
  createLocalStorage().set('userAccount', account);
};

export const getLocalLoginAccountAdapter = (): AccountModel => {
  return createLocalStorage().get<AccountModel>('userAccount');
};
