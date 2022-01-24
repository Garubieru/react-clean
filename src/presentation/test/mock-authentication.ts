import { mockAuthenticationModel } from '@/domain/test';
import { Authentication } from '@/domain/usecases';

export class AuthenticationSpy implements Authentication {
  params: Authentication.Params;
  account = mockAuthenticationModel();
  callsCount = 0;
  async auth(params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    return await Promise.resolve(this.account);
  }
}
