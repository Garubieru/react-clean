import faker from 'faker';

import { RequiredFieldError } from '@/presentation/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';

const createSut = (): RequiredFieldValidation =>
  new RequiredFieldValidation(faker.database.column());

describe('RequiredFieldValidation', () => {
  it('Should throw error when value is empty', () => {
    const sut = createSut();
    const result = sut.validate('');
    expect(result).toEqual(new RequiredFieldError());
  });

  it('Should not throw error when value is empty', () => {
    const sut = createSut();
    const result = sut.validate(faker.random.words());
    expect(result).toBeFalsy();
  });
});
