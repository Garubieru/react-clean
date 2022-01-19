import { SetStorage } from '@/data/protocols/cache';

export class SetLocalStorageAdapter implements SetStorage {
  set(key: string, value: string): void {
    localStorage.setItem(key, value);
  }
}
