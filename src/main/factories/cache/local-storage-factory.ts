import { SetStorage, GetStorage } from '@/data/protocols/cache';
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter';

type CreateLocalStorage = SetStorage & GetStorage;

export const createLocalStorage = (): CreateLocalStorage => new LocalStorageAdapter();
