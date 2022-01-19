import faker from 'faker';
import { CompareFieldsValidation } from './compare-fields-validation';
import { InvalidFieldError } from '@/presentation/validation/errors';

const createSut = (fieldToCompare = faker.database.column()): CompareFieldsValidation =>
  new CompareFieldsValidation(fieldToCompare);

describe('CompareFieldsValidation', () => {
  it('Should return CompareFieldError if fields are different', () => {
    const fieldToCompare = faker.database.column();
    const sut = createSut(fieldToCompare);
    const result = sut.validate(faker.random.words(3), {
      [fieldToCompare]: faker.random.words(5),
    });

    expect(result).toEqual(
      new InvalidFieldError(`Field must be equal to ${fieldToCompare}`),
    );
  });

  it('Should succeed if fields are equal', () => {
    const field = faker.database.column();
    const value = faker.random.word();
    const sut = createSut(field);
    const result = sut.validate(value, { [field]: value });
    expect(result).toBeFalsy();
  });
});
