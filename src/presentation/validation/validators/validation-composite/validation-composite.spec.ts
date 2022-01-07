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
  const fieldValidationSpy3 = new FieldValidationSpy();
  const validations = {
    [field1]: [fieldValidationSpy1, fieldValidationSpy3],
    [field2]: [fieldValidationSpy2],
  };
  const sut = ValidationComposite.build(validations);
  return { sut, fieldsValidationsSpy: validations };
};

describe('ValidationComposite', () => {
  it('Should return first error found if any validation fails in all fields', () => {
    const field1 = faker.database.column();
    const field2 = faker.database.column();
    const { sut, fieldsValidationsSpy } = createSut(field1, field2);
    const error1 = faker.random.word();
    const error2 = faker.random.word();
    fieldsValidationsSpy[field1][0].error = new InvalidFieldError(error1);
    fieldsValidationsSpy[field1][1].error = new InvalidFieldError(faker.random.word());
    fieldsValidationsSpy[field2][0].error = new InvalidFieldError(error2);
    const result = sut.validate({
      [field1]: faker.random.words(),
      [field2]: faker.random.words(),
    });
    expect(result).toEqual({ [field1]: error1, [field2]: error2 });
  });

  it('Should not return error if any validation succeeds in all fields', () => {
    const field1 = faker.database.column();
    const field2 = faker.database.column();
    const { sut } = createSut(field1, field2);
    const result = sut.validate({
      [field1]: faker.random.words(),
      [field2]: faker.random.words(),
    });
    expect(result).toEqual({ [field1]: null, [field2]: null });
  });
});
