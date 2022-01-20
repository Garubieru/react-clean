import faker from 'faker';
import 'jest-localstorage-mock';
import { LocalStorageAdapter } from './local-storage-adapter';

const createSut = (): LocalStorageAdapter => new LocalStorageAdapter();

describe('LocalStorageAdapter', () => {
  beforeEach(() => localStorage.clear());
  describe('set', () => {
    it('Should class localStorage.setItem with correct params', () => {
      const sut = createSut();
      const key = faker.database.column();
      const value = faker.datatype.uuid();
      sut.set(key, value);
      expect(localStorage.setItem).toHaveBeenCalledWith(key, value);
    });

    it('Should set localStorage with correct value', () => {
      const sut = createSut();
      const key = faker.database.column();
      const value = faker.datatype.uuid();
      sut.set(key, value);
      expect(localStorage.getItem(key)).toBe(value);
    });
  });

  describe('get', () => {
    it('Should call localStorage.getItem with correct value', () => {
      const sut = createSut();
      const key = faker.database.column();
      sut.get(key);
      expect(localStorage.getItem).toHaveBeenCalledWith(key);
    });

    it('Should return correct value if localStorage item is set', () => {
      const sut = createSut();
      const key = faker.database.column();
      const item = faker.random.objectElement();
      localStorage.setItem(key, item);
      const result = sut.get(key);
      expect(result).toEqual(item);
    });

    it('Should not return value if localStorage item is not set', () => {
      const sut = createSut();
      const result = sut.get(faker.database.column());
      expect(result).toBeFalsy();
    });
  });
});
