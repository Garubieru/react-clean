import { SetStorage } from '@/data/protocols/cache';
import { UnexpectedError } from '@/domain/errors';
import { StoreAccessToken } from '@/domain/usecases';

export class LocalStoreAccessToken implements StoreAccessToken {
  constructor(private readonly setStorage: SetStorage) {}
  async store(accessToken: string): Promise<void> {
    if (!accessToken) throw new UnexpectedError();
    return await this.setStorage.set('accessToken', accessToken);
  }
}
