import faker from 'faker';
import 'jest-localstorage-mock';
import { SetLocalStorageAdapter } from './set-local-storage-adapter';

describe('SetLocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear());
  it('Should class localStorage.setItem with correct params', async () => {
    const sut = new SetLocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.datatype.uuid();
    await sut.set(key, value);
    expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
  });

  it('Should set localStorage with correct value', async () => {
    const sut = new SetLocalStorageAdapter();
    const key = faker.database.column();
    const value = faker.datatype.uuid();
    await sut.set(key, value);
    expect(localStorage.getItem(key)).toBe(value);
  });
});
