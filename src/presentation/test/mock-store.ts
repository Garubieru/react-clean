import { AccountModel } from '@/domain/models';
import { StoreLoginAccount } from '@/domain/usecases';

export class StoreLoginAccountMock implements StoreLoginAccount {
  account: AccountModel;
  async store(account: AccountModel): Promise<void> {
    this.account = account;
  }
}
