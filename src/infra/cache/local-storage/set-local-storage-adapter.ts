import { SetStorage } from '@/data/protocols/cache';

export class SetLocalStorageAdapter implements SetStorage {
  async set(key: string, value: string): Promise<void> {
    return localStorage.setItem(key, value);
  }
}
