import { SetStorage, GetStorage } from '@/data/protocols/cache';

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: any): void {
    localStorage.setItem(key, JSON.stringify(value));
  }

  get<T>(key: string): T {
    return JSON.parse(localStorage.getItem(key)) as T;
  }
}
