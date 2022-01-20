import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { createLocalStorage } from '@/main/factories';

export const setLocalLoginAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) throw new UnexpectedError();
  createLocalStorage().set('userAccount', JSON.stringify(account));
};
