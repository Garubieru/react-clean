import { Signup } from '@/domain/usecases';
import { mockSignupModel } from '@/domain/test';

export class RemoteSignupSpy implements Signup {
  account = mockSignupModel();
  params: Signup.Params;
  callsCount = 0;
  async create(params: Signup.Params): Promise<Signup.Model> {
    this.callsCount++;
    this.params = params;
    return await Promise.resolve(this.account);
  }
}
