export type AccountParams = {
  name: string;
  email: string;
  password: string;
  passwordConfirmation: string;
};

export interface RemoteSignupProtocol {
  create: (params: AccountParams) => Promise<void>;
}