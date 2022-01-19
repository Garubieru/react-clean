import { SetStorage } from '@/data/protocols/cache';
import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { StoreLoginAccount } from '@/domain/usecases';

export class LocalStoreLoginAccount implements StoreLoginAccount {
  constructor(private readonly setStorage: SetStorage) {}
  store(account: AccountModel): void {
    if (!account?.accessToken) throw new UnexpectedError();
    this.setStorage.set('userAccount', JSON.stringify(account));
  }
}
