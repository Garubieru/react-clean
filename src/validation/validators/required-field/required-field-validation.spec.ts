import faker from 'faker';
import { RequiredFieldValidation } from '@/validation/validators';
import { RequiredFieldError } from '@/validation/errors';

const createSut = (): RequiredFieldValidation => new RequiredFieldValidation();

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
