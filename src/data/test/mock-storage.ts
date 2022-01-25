import { GetStorage } from '@/data/protocols/cache';
import faker from 'faker';
export class GetStorageSpy implements GetStorage {
  key: string;
  value: any = faker.random.objectElement<{ key: string }>();

  get<T = any>(key: string): T {
    this.key = key;
    return this.value;
  }
}
