import { StoreAccessToken } from '@/domain/usecases';

export class StoreAccessTokenMock implements StoreAccessToken {
  accessToken: string;
  async store(accessToken: string): Promise<void> {
    this.accessToken = accessToken;
  }
}
