import faker from 'faker';
import { FieldValidationSpy } from '@/presentation/validation/validators/test';
import { InvalidFieldError } from '@/presentation/validation/errors';
import { ValidationComposite } from './validation-composite';

describe('ValidationComposite', () => {
  it('Should return error if any validation fails', () => {
    const fieldValidationSpy1 = new FieldValidationSpy('any_field');
    const fieldValidationSpy2 = new FieldValidationSpy('any_field');
    const sut = new ValidationComposite([fieldValidationSpy1, fieldValidationSpy2]);
    fieldValidationSpy2.error = new InvalidFieldError('any_error_message');
    const result = sut.validate('any_field', faker.random.word());
    expect(result).toBe('any_error_message');
  });

  it('Should not return error if any validation succeeds', () => {
    const fieldValidationSpy = new FieldValidationSpy('any_field');
    jest.spyOn(fieldValidationSpy, 'validate').mockReturnValueOnce(null);
    const sut = new ValidationComposite([fieldValidationSpy]);
    const result = sut.validate('any_field', faker.random.word());
    expect(result).toBeFalsy();
  });
});
