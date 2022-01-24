import { AccountModel } from '@/domain/models';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export namespace Authentication {
  export type Params = {
    email: string;
    password: string;
  };
  export type Model = AccountModel;
}

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>;
}
