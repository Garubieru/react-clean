export interface StoreAccessToken {
  store: (key: string, value: string) => Promise<void>;
}
