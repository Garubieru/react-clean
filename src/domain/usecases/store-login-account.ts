import { AccountModel } from '@/domain/models';

export interface StoreLoginAccount {
  store: (account: AccountModel) => void;
}
