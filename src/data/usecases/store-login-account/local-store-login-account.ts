import { SetStorage } from '@/data/protocols/cache';
import { UnexpectedError } from '@/domain/errors';
import { AccountModel } from '@/domain/models';
import { StoreLoginAccount } from '@/domain/usecases';

export class LocalStoreLoginAccount implements StoreLoginAccount {
  constructor(private readonly setStorage: SetStorage) {}
  async store(account: AccountModel): Promise<void> {
    if (!account?.accessToken) throw new UnexpectedError();
    return await this.setStorage.set('userAccount', JSON.stringify(account));
  }
}
