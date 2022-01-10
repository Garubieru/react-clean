import faker from 'faker';
import { CompareFieldsValidation } from './compare-fields-validation';
import { InvalidFieldError } from '@/presentation/validation/errors';

const createSut = (value = faker.random.word()): CompareFieldsValidation =>
  new CompareFieldsValidation(value);

describe('CompareFieldsValidation', () => {
  it('Should return InvalidFieldError if fields are different', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.word());
    expect(result).toEqual(new InvalidFieldError('Invalid field'));
  });

  it('Should not return InvalidFieldError if fields are equal', () => {
    const value = faker.random.word();
    const sut = createSut(value);
    const result = sut.validate(value);
    expect(result).not.toEqual(new InvalidFieldError('Invalid field'));
  });
});
