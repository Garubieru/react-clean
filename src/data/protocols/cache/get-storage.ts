export interface GetStorage {
  get: <T = any>(key: string) => T;
}
