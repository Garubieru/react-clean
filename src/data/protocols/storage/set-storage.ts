export interface SetStorage {
  set: (key: string, value: unknown) => Promise<void>;
}
