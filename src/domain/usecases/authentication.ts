import { AccountModel } from '@/domain/models';

export type AuthenticationParams = {
  email: string;
  password: string;
};

export interface AuthenticationProtocol {
  auth: (params: AuthenticationParams) => Promise<AccountModel>;
}
