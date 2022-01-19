import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { createSetLocalStorage } from '@/main/factories';

export const setLocalLoginAccountAdapter = (account: AccountModel): void => {
  if (!account?.accessToken) throw new UnexpectedError();
  createSetLocalStorage().set('userAccount', JSON.stringify(account));
};
