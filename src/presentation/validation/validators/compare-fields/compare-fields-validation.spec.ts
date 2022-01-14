import faker from 'faker';
import { CompareFieldsValidation } from './compare-fields-validation';
import { CompareFieldError } from '@/presentation/validation/errors';

const createSut = (fieldToCompare = faker.database.column()): CompareFieldsValidation =>
  new CompareFieldsValidation(fieldToCompare);

describe('CompareFieldsValidation', () => {
  it('Should return CompareFieldError if fields are different', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.word(), {
      [faker.database.column()]: faker.random.word(),
    });
    expect(result).toEqual(new CompareFieldError());
  });

  it('Should succeed if fields are equal', () => {
    const field = faker.database.column();
    const value = faker.random.word();
    const sut = createSut(field);
    const result = sut.validate(value, { [field]: value });
    expect(result).toBeFalsy();
  });
});
