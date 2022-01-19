import { AccountModel } from '@/domain/models';
import { StoreLoginAccount } from '@/domain/usecases';

export class StoreLoginAccountMock implements StoreLoginAccount {
  account: AccountModel;
  store(account: AccountModel): void {
    this.account = account;
  }
}
