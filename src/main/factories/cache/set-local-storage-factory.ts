import { SetStorage } from '@/data/protocols/cache';
import { SetLocalStorageAdapter } from '@/infra/cache/local-storage/set-local-storage-adapter';

export const createSetLocalStorage = (): SetStorage => new SetLocalStorageAdapter();
