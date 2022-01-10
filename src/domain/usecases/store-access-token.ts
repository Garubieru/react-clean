export interface StoreAccessToken {
  store: (accessToken: string) => Promise<void>;
}
