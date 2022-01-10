import { SetStorage } from '@/data/protocols/cache';
import { StoreAccessToken } from '@/domain/usecases';

export class LocalStoreAccessToken implements StoreAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async store(accessToken: string): Promise<void> {
    return await this.setStorage.set('accessToken', accessToken);
  }
}
