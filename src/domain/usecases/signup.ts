export type AccountParams = {
  email: string;
  password: string;
};

export interface SigninProtocol {
  create: (params: AccountParams) => Promise<void>;
}
