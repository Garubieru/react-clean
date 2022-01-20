import { SetStorage } from '@/data/protocols/cache';
import { LocalStorageAdapter } from '@/infra/cache/local-storage/local-storage-adapter';

export const createLocalStorage = (): SetStorage => new LocalStorageAdapter();
