import faker from 'faker';
import { FieldValidationSpy } from '@/presentation/validation/validators/test';
import { InvalidFieldError } from '@/presentation/validation/errors';
import { ValidationComposite } from './validation-composite';

type SutTypes = {
  sut: ValidationComposite;
  fieldsValidationsSpy: { [fieldName: string]: FieldValidationSpy[] };
};

const createSut = (field1: string, field2: string): SutTypes => {
  const fieldValidationSpy1 = new FieldValidationSpy();
  const fieldValidationSpy2 = new FieldValidationSpy();
  const validations = {
    [field1]: [fieldValidationSpy1],
    [field2]: [fieldValidationSpy2],
  };
  const sut = ValidationComposite.build(validations);
  return { sut, fieldsValidationsSpy: validations };
};

describe('ValidationComposite', () => {
  it('Should return first error found if any validation fails', () => {
    const field1 = faker.database.column();
    const field2 = faker.database.column();
    const { sut, fieldsValidationsSpy } = createSut(field1, field2);
    const error1 = faker.random.word();
    fieldsValidationsSpy[field1][0].error = new InvalidFieldError(error1);
    fieldsValidationsSpy[field2][0].error = new InvalidFieldError(faker.random.word());
    const result = sut.validate(field1, faker.random.word());
    expect(result).toBe(error1);
  });

  it('Should not return error if any validation succeeds', () => {
    const field1 = faker.database.column();
    const field2 = faker.database.column();
    const { sut } = createSut(field1, field2);
    const result = sut.validate(field1, faker.random.word());
    expect(result).toBeFalsy();
  });
});
