import { LocalStoreAccessToken } from '@/data/usecases/store-access-token/local-store.access-token';
import { StoreAccessToken } from '@/domain/usecases';
import { createSetLocalStorage } from '@/main/factories/cache';

export const createLocalStoreAccessToken = (): StoreAccessToken => {
  const storage = new LocalStoreAccessToken(createSetLocalStorage());
  return storage;
};
