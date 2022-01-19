import { LocalStoreLoginAccount } from '@/data/usecases';
import { StoreLoginAccount } from '@/domain/usecases';
import { createSetLocalStorage } from '@/main/factories/cache';

export const createLocalStoreLoginAccount = (): StoreLoginAccount => {
  const storage = new LocalStoreLoginAccount(createSetLocalStorage());
  return storage;
};
