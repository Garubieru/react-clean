import { RequiredFieldError } from '@/presentation/validation/errors';
import { RequiredFieldValidation } from './required-field-validation';

describe('RequiredFieldValidation', () => {
  it('Should throw error when value is empty', () => {
    const sut = new RequiredFieldValidation('field');
    const result = sut.validate('');
    expect(result).toEqual(new RequiredFieldError());
  });
});
