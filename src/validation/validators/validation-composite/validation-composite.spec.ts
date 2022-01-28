import faker from 'faker';
import { FieldValidationSpy } from '@/validation/test';
import { InvalidFieldError } from '@/validation/errors';
import { ValidationComposite } from '@/validation/validators';

type SutTypes = {
  sut: ValidationComposite;
  fieldsValidationsSpy: { [fieldName: string]: FieldValidationSpy[] };
};

const createSut = (field1: string, field2: string): SutTypes => {
  const fieldValidationSpy1 = new FieldValidationSpy();
  const fieldValidationSpy2 = new FieldValidationSpy();
  const fieldValidationSpy3 = new FieldValidationSpy();
  const fieldsValidationsSpy = {
    [field1]: [fieldValidationSpy1, fieldValidationSpy2],
    [field2]: [fieldValidationSpy3],
  };
  const sut = ValidationComposite.build(fieldsValidationsSpy);
  return { sut, fieldsValidationsSpy };
};

describe('ValidationComposite', () => {
  it('Should return first error found if any validation fails in all fields', () => {
    const field1 = 'field_1';
    const field2 = 'field_2';
    const { sut, fieldsValidationsSpy } = createSut(field1, field2);
    const error1 = faker.random.word();
    const error2 = faker.random.words(3);
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
    const field1 = 'field_1';
    const field2 = 'field_2';
    const { sut } = createSut(field1, field2);
    const result = sut.validate({
      [field1]: faker.random.words(),
      [field2]: faker.random.words(),
    });
    expect(result).toEqual({ [field1]: null, [field2]: null });
  });
});
