import { GetStorage } from '@/data/protocols/cache';
import faker from 'faker';
export class GetStorageSpy implements GetStorage {
  key: string;
  value: string = JSON.stringify(faker.random.objectElement<{ key: string }>());

  get(key: string): string {
    this.key = key;
    return this.value;
  }
}
