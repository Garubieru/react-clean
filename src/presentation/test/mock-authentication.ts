import { AccountModel } from '@/domain/models';
import { mockAccount } from '@/domain/test';
import { AuthenticationParams, AuthenticationProtocol } from '@/domain/usecases';

export class AuthenticationSpy implements AuthenticationProtocol {
  params: AuthenticationParams;
  account = mockAccount();
  async auth(params: AuthenticationParams): Promise<AccountModel> {
    this.params = params;
    return await Promise.resolve(this.account);
  }
}
