import { AccountModel } from '@/domain/models';

export namespace Signup {
  export type Params = {
    name: string;
    email: string;
    password: string;
    passwordConfirmation: string;
  };

  export type Model = AccountModel;
}
export interface Signup {
  create: (params: Signup.Params) => Promise<Signup.Model>;
}
