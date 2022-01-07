import faker from 'faker';
import { FieldValidationSpy } from '@/presentation/validation/validators/test';
import { InvalidFieldError } from '@/presentation/validation/errors';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldsValidationsSpy: FieldValidationSpy[];
};

const createSut = (field: string): SutTypes => {
  const fieldValidationSpy1 = new FieldValidationSpy(field);
  const fieldValidationSpy2 = new FieldValidationSpy(field);
  const validations = [fieldValidationSpy1, fieldValidationSpy2];
  const sut = new ValidationComposite([fieldValidationSpy1, fieldValidationSpy2]);
  return { sut, fieldsValidationsSpy: validations };
};

describe('ValidationComposite', () => {
  it('Should return first error found if any validation fails', () => {
    const field = faker.database.column();
    const { sut, fieldsValidationsSpy } = createSut(field);
    const error1 = faker.random.word();
    fieldsValidationsSpy[0].error = new InvalidFieldError(error1);
    fieldsValidationsSpy[1].error = new InvalidFieldError(faker.random.word());
    const result = sut.validate(field, faker.random.word());
    expect(result).toBe(error1);
  });

  it('Should not return error if any validation succeeds', () => {
    const field = faker.database.column();
    const { sut } = createSut(field);
    const result = sut.validate(field, faker.random.word());
    expect(result).toBeFalsy();
  });
});
