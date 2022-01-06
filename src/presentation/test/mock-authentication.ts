import { AccountModel } from '@/domain/models';
import { mockAccount } from '@/domain/test';
import { AuthenticationParams, AuthenticationProtocol } from '@/domain/usecases';

export class AuthenticationSpy implements AuthenticationProtocol {
  params: AuthenticationParams;
  account = mockAccount();
  callsCount = 0;
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  }
}
