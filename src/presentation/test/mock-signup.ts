import { AccountParams, RemoteSignupProtocol } from '@/domain/usecases';
import { AccountModel } from '@/domain/models';
import { mockAccount } from '@/domain/test';

export class RemoteSignupSpy implements RemoteSignupProtocol {
  account = mockAccount();
  params: AccountParams;
  callsCount = 0;
  async create(params: AccountParams): Promise<AccountModel> {
    this.callsCount++;
    this.params = params;
    return await Promise.resolve(this.account);
  }
}
