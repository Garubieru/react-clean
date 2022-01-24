import { GetStorage } from '@/data/protocols/cache';
import faker from 'faker';
export class GetStorageSpy implements GetStorage {
  key: string;
  value: string = faker.random.word();

  get(key: string): string {
    this.key = key;
    return this.value;
  }
}
