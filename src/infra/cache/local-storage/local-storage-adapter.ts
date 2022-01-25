import { SetStorage, GetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: any): void {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
      return;
    }
    localStorage.removeItem(key);
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
}
